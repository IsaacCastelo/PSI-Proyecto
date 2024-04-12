import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { patchPedido } from '../../api/api';
import { toast } from 'react-hot-toast';

Order.propTypes = {
  productos: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  fetchPedido: PropTypes.func.isRequired,
  fetchDetallesPedido: PropTypes.func.isRequired,
  pedido: PropTypes.object.isRequired,
};

export default function Order({
  productos,
  total,
  fetchPedido,
  fetchDetallesPedido,
  pedido,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPedido(id);
    fetchDetallesPedido(id);
  }, []);

  function handleButtonClick() {
    patchPedido(id, { estado: 3 }).then(() => {
      toast.success('Estado de órden actualizado correctamente');
      setTimeout(() => {
        navigate('/view-orders/');
      }, 2000);
    });
  }

  return (
    <section className='w-full p-6 px-9'>
      <header className='py-3'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>
          Orden #{pedido.id} - {pedido?.nombre_cliente || pedido?.mesa}
        </p>
      </header>
      <div className='border shadow-xl p-6'>
        <table className='w-full text-left'>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((detalle) => (
              <tr key={detalle.id}>
                <td>{detalle.nombre}</td>
                <td>{detalle.cantidad}</td>
                <td>{detalle.notas}</td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td>Total: </td>
              <td>${total}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {pedido.estado == 1 && (
        <button
          type='button'
          onClick={handleButtonClick}
          className='w-full my-3 p-2 bg-green-700 text-white rounded shadow-md'
        >
          Marcar como completada(No pagada)
        </button>
      )}
    </section>
  );
}

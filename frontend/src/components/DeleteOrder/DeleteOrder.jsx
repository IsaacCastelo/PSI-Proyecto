import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { deletePedido } from '../../api/api';
import { toast } from 'react-hot-toast';

DeleteOrder.propTypes = {
  productos: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  fetchPedido: PropTypes.func.isRequired,
  fetchDetallesPedido: PropTypes.func.isRequired,
  pedido: PropTypes.object.isRequired,
};

export default function DeleteOrder({
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
    deletePedido(id).then(() => {
      toast.success('Órden cancelada, redireccionando automáticamente');
      setTimeout(() => {
        navigate('/delete-orders/');
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
              <td>Total: </td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        type='button'
        onClick={handleButtonClick}
        className='w-full my-3 p-2 bg-red-700 text-white rounded shadow-md'
      >
        Cancelar órden
      </button>
    </section>
  );
}

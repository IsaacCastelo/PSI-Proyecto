import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { patchPedido } from '../../api/api';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

OpenOrder.propTypes = {
  productos: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  fetchPedido: PropTypes.func.isRequired,
  fetchDetallesPedido: PropTypes.func.isRequired,
  pedido: PropTypes.object.isRequired,
};
export default function OpenOrder({
  productos,
  total,
  fetchPedido,
  fetchDetallesPedido,
  pedido,
}) {
  const [open, setOpen] = useState(false);
  const [pago, setPago] = useState(0);
  const [cambio, setCambio] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPedido(id);
    fetchDetallesPedido(id);
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    patchPedido(id, { total, pago, cambio, estado: 4 }).then(() => {
      toast.success(
        'Órden pagada exitosamente, redireccionando automáticamente'
      );
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
          Pagar órden #{pedido.id} - {pedido?.nombre_cliente || pedido?.mesa}
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
      <button
        onClick={() => setOpen(true)}
        className='w-full my-3 p-2 bg-blue-700 text-white rounded shadow-md'
      >
        Pagar
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={(e) => {
            onSubmit(e);
            setPago(0);
            setCambio(0);
          }}
          className='flex flex-col justify-around gap-6'
        >
          <legend className='font-semibold'>Se recibe*</legend>
          <input
            value={pago}
            onChange={(e) => {
              setPago(e.target.value);
              setCambio(e.target.value - total);
            }}
            className='border w-full'
            type='number'
            min='1'
          />
          <legend className='font-semibold'>Se entrega: </legend>
          <input
            className='border w-full'
            type='text'
            min='1'
            readOnly
            value={cambio + '$'}
          />
          <button
            type='submit'
            className='w-full p-2 bg-green-500 text-white rounded shadow-md'
          >
            Pagar
          </button>
        </form>
      </Modal>
    </section>
  );
}

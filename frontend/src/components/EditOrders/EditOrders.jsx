import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPedidos } from '../../api/api';

EditOrders.propTypes = {
  pedidos: PropTypes.array.isRequired,
  setPedidos: PropTypes.func.isRequired,
};

export default function EditOrders({ pedidos, setPedidos }) {
  const navigate = useNavigate();

  function handleOrderClick(pedido) {
    navigate(`/edit-order/${pedido.id}/`);
  }

  useEffect(() => {
    getPedidos().then((pedidos) => {
      setPedidos(pedidos.filter((pedido) => pedido.estado != 4));
    });
  }, [setPedidos]);

  return (
    <section className='w-full p-6'>
      <header className='py-3'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>Selecciona órden a editar</p>
      </header>
      <div className='p-6 border shadow-xl'>
        <table className='flex-col w-full text-center'>
          <thead className='border-b-2 border-black'>
            <tr>
              <th>Cliente/Mesa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>
                  {pedido.nombre_cliente ? pedido.nombre_cliente : pedido.mesa}
                </td>
                <td>
                  <button
                    className='material-icons'
                    onClick={() => handleOrderClick(pedido)}
                  >
                    edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

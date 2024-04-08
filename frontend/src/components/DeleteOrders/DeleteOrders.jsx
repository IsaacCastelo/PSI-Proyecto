import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getPedidos } from '../../api/api';

DeleteOrders.propTypes = {
  pedidos: PropTypes.array.isRequired,
  setPedidos: PropTypes.func.isRequired,
};

export default function DeleteOrders({ pedidos, setPedidos }) {
  const navigate = useNavigate();

  function handleOrderClick(pedido) {
    navigate(`/delete-order/${pedido.id}/`);
  }

  useEffect(() => {
    getPedidos().then((pedidos) => {
      setPedidos(pedidos);
    });
  }, [setPedidos]);

  function getEstado(estado) {
    const estados = ['Pendiente', 'En proceso', 'Listo', 'Entregado'];
    return estados[estado - 1];
  }

  return (
    <section className='w-full p-6'>
      <header className='py-3'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>Cancelar una órden</p>
      </header>
      <div className='p-6 border shadow-xl'>
        <table className='flex-col w-full text-center'>
          <thead className='border-b-2 border-black'>
            <tr>
              <th>Estado</th>
              <th>Cliente/Mesa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{getEstado(pedido.estado)}</td>
                <td>
                  {pedido.nombre_cliente ? pedido.nombre_cliente : pedido.mesa}
                </td>
                <td>
                  <button
                    className='material-icons'
                    onClick={() => handleOrderClick(pedido)}
                  >
                    delete_forever
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

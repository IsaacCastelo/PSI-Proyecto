import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

ProductsList.propTypes = {
  platillos: PropTypes.array.isRequired,
};

export default function ProductsList({ platillos }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleEditClick() {
    navigate('/edit-product');
  }

  function handleDeleteClick() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <section className='w-full p-6'>
      <header className='py-3'>
        <h1 className='text-2xl'>Administrar productos</h1>
        <p className='text-sm text-gray-500'>Ver productos</p>
      </header>
      <div className='p-6 border shadow-xl'>
        <table className='flex-col w-full text-center'>
          <thead className='border-b-2 border-black'>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {platillos.length ? (
              platillos.map((platillo) => (
                <tr key={platillo.id}>
                  <td>{platillo.nombre}</td>
                  <td>{platillo.descripción}</td>
                  <td>{platillo.precio}</td>
                  <td>
                    <button
                      className='material-icons'
                      onClick={handleEditClick}
                    >
                      edit
                    </button>
                    <button
                      className='material-icons'
                      onClick={handleDeleteClick}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <td>
                <td>No hay productos registrados</td>
              </td>
            )}
          </tbody>
        </table>
      </div>
      <Modal open={isOpen} onClose={closeModal}>
        <div className='flex flex-col gap-4'>
          <h2 className='font-bold'>
            Seguro que quieres <br />
            borrar este producto?
          </h2>
          <button
            className='bg-gray-500 rounded text-white'
            onClick={closeModal}
          >
            Volver
          </button>
          <button
            className='bg-red-600 rounded text-white font-bold'
            onClick={closeModal}
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </section>
  );
}

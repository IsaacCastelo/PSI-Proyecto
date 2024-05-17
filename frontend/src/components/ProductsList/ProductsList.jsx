import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePlatillo, getPlatillos } from '../../api/api';
import Modal from '../Modal/Modal';
import toast from 'react-hot-toast';

ProductsList.propTypes = {
  platillos: PropTypes.array.isRequired,
  setPlatillos: PropTypes.func.isRequired,
};

export default function ProductsList({ platillos, setPlatillos }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const id = useRef(null);

  function handleEditClick(id) {
    navigate(`/edit-product/${id}`);
  }

  function handleDeleteClick(platilloId) {
    setIsOpen(true);
    id.current = platilloId;
  }

  async function handleDeleteConfirmation() {
    const res = await deletePlatillo(id.current);
    if (res.status === 204) {
      setPlatillos(platillos.filter((platillo) => platillo.id !== id.current));
    }
    closeModal();
    toast.success('Producto eliminado');
  }

  function closeModal() {
    setIsOpen(false);
  }

  function filterPlatillos() {
    setPlatillos(platillos.filter((platillo) => platillo.activo));
  }

  useEffect(() => {
    getPlatillos()
      .then((data) => {
        setPlatillos(data);
        filterPlatillos();
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setPlatillos]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full h-full animate-spin'>
        <span className='material-icons animate-spin rotate-90'>update</span>
      </div>
    );
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
            {platillos?.length ? (
              platillos.map((platillo) => (
                <tr key={platillo.id}>
                  <td>{platillo.nombre}</td>
                  <td>{platillo.descripción}</td>
                  <td>{platillo.precio}</td>
                  <td>
                    <button
                      className='material-icons'
                      onClick={() => handleEditClick(platillo.id)}
                    >
                      edit
                    </button>
                    <button
                      className='material-icons'
                      onClick={() => handleDeleteClick(platillo.id)}
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
            onClick={() => handleDeleteConfirmation()}
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </section>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

export default function EmployeeList() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function handleEditClick() {
    navigate('/edit-employee');
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
        <h1 className='text-2xl'>Administrar empleados</h1>
        <p className='text-sm text-gray-500'>Lista de empleados</p>
      </header>
      <div className='p-6 border shadow-xl'>
        <table className='w-full text-center'>
          <thead className='border-b-2 border-black'>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Juan Delgado</td>
              <td>Administrador</td>
              <td>
                <button className='material-icons' onClick={handleEditClick}>
                  edit
                </button>
                <button className='material-icons' onClick={handleDeleteClick}>
                  delete
                </button>
              </td>
            </tr>
            <tr>
              <td>Maria Lopez</td>
              <td>Mesero</td>
              <td>
                <button className='material-icons' onClick={handleEditClick}>
                  edit
                </button>
                <button className='material-icons' onClick={handleDeleteClick}>
                  delete
                </button>
              </td>
            </tr>
            <tr>
              <td>Pedro Ramirez</td>
              <td>Cocinero</td>
              <td>
                <button className='material-icons' onClick={handleEditClick}>
                  edit
                </button>
                <button className='material-icons' onClick={handleDeleteClick}>
                  delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal open={isOpen} onClose={closeModal}>
        <div className='flex flex-col gap-4'>
          <h2 className='font-bold'>
            Seguro que quieres <br />
            eliminar este empleado?
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

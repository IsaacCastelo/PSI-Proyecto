import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { getUsuarios, deleteUsuario, getUsuario } from '../../api/api';
import toast from 'react-hot-toast';

export default function EmployeeList() {
  const [isOpen, setIsOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const currentId = useRef(-1);
  const navigate = useNavigate();

  function handleEditClick(id) {
    navigate(`/edit-employee/${id}`);
  }

  function handleDeleteClick(id) {
    currentId.current = id;
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function confirmDelete() {
    const usuario = await getUsuario(currentId.current);
    if (usuario?.rol === 1) {
      toast.error('No puedes eliminar un administrador');
      closeModal();
      return;
    }

    deleteUsuario(currentId.current).then((usuarios) => {
      setUsuarios(usuarios);
      toast.success('Empleado eliminado correctamente');
    });
    closeModal();
  }

  /**
   * Fetches the list of users from the API and sets the state.
   * Also maps the role number to a string.
   */
  useEffect(() => {
    getUsuarios().then((usuarios) => {
      setUsuarios(
        usuarios?.map((usuario) => {
          return usuario.rol === 1
            ? { ...usuario, rol: 'Administrador' }
            : usuario.rol === 2
            ? { ...usuario, rol: 'Mesero' }
            : { ...usuario, rol: 'Cocinero' };
        })
      );
    });
  }, [usuarios.length]);

  return (
    <section className='w-full p-6'>
      <header className='py-3'>
        <h1 className='text-2xl'>Administrar empleados</h1>
        <p className='text-sm text-gray-500'>Lista de empleados</p>
      </header>
      <div className='p-6 border shadow-xl'>
        {
          <table className='w-full text-center'>
            <thead className='border-b-2 border-black'>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios?.length ? (
                usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombre_empleado}</td>
                    <td>{usuario.rol}</td>
                    <td>
                      <button
                        className='material-icons'
                        onClick={() => handleEditClick(usuario.id)}
                      >
                        edit
                      </button>
                      <button
                        className='material-icons'
                        onClick={() => handleDeleteClick(usuario.id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No hay empleados para mostrar</td>
                </tr>
              )}
            </tbody>
          </table>
        }
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
            onClick={confirmDelete}
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </section>
  );
}

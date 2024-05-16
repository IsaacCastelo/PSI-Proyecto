import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeesDashboard() {
  const navigate = useNavigate();

  function handleRegisterEmployeeClick() {
    navigate('/add-employee');
  }

  function handleEditEmployeeClick() {
    navigate('/employee-list');
  }

  function handleEmplyeeListClick() {
    navigate('/employee-list');
  }

  function handleDeleteEmployeeClick() {
    navigate('/employee-list');
  }

  useEffect(() => {
    document.title = 'Administrar empleados';
  }, []);

  return (
    <section className='w-full p-12'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar empleados</h1>
        <p className='text-sm text-gray-500'>
          Permite la gestión de los empleados del restaurante
        </p>
      </header>
      <div className='flex flex-wrap p-4 gap-8 justify-center shadow-md button'>
        <button
          onClick={handleRegisterEmployeeClick}
          className='flex justify-around w-52 p-6 shadow-md items-center
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Registrar empleado
          <span className='material-icons py-1'>add_circle</span>
        </button>
        <button
          onClick={handleEmplyeeListClick}
          className='flex justify-around w-52 p-6 shadow-md items-center
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Lista de empleados
          <span className='material-icons py-1'>remove_red_eye</span>
        </button>
        <button
          onClick={handleEditEmployeeClick}
          className='flex justify-around w-52 p-6 shadow-md items-center
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Editar empleado
          <span className='material-icons py-1'>edit</span>
        </button>
        <button
          onClick={handleDeleteEmployeeClick}
          className='flex justify-around w-52 p-6 shadow-md items-center
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Eliminar empleado
          <span className='material-icons py-1'>cancel</span>
        </button>
      </div>
    </section>
  );
}

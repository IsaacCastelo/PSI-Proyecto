import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

Login.propTypes = {
  setIsLogged: PropTypes.func.isRequired,
};

export default function Login({ setIsLogged }) {
  const navigate = useNavigate();

  function handleLogin() {
    setIsLogged(true);
    navigate('/dashboard');
  }

  return (
    <section className='w-full'>
      <header className='p-6'>
        <h1 className='text-2xl'>Iniciar sesión</h1>
        <p className='text-sm text-gray-500'>Ingresa tus datos</p>
      </header>
      <form className='flex flex-col items-center gap-3'>
        <h2>Datos del empleado</h2>
        <input placeholder='Nombre de usuario' className='rounded shadow p-1' />
        <input
          placeholder='Contraseña'
          type='password'
          className='rounded shadow px-1'
        />
        <button
          className='bg-blue-600 rounded px-14 text-white font-bold py-1 hover:bg-blue-800 transition-all hover:text-gray-400'
          onClick={handleLogin}
        >
          Iniciar sesión
        </button>
      </form>
    </section>
  );
}

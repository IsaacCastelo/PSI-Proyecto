import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/AuthContext';
import { login } from '../../api/api';

export default function Login() {
  const auth = useAuth();
  const { register, handleSubmit } = useForm();

  function handleLogin(data) {
    login(data).then((response) => {
      if (response) {
        auth.login(response.access);
      }
    });
  }

  return (
    <section className='w-full'>
      <header className='p-6'>
        <h1 className='text-2xl'>Iniciar sesión</h1>
        <p className='text-sm text-gray-500'>Ingresa tus datos</p>
      </header>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className='flex flex-col items-center gap-3'
      >
        <h2>Datos de usuario</h2>
        <input
          {...register('nombre_usuario', { required: true })}
          placeholder='Nombre de usuario'
          className='rounded shadow p-1'
        />
        <input
          {...register('contraseña', { required: true })}
          placeholder='Contraseña'
          type='password'
          className='rounded shadow px-1'
        />
        <button
          className='bg-blue-600 rounded px-14 text-white font-bold py-1 hover:bg-blue-800 transition-all hover:text-gray-400'
          type='submit'
        >
          Iniciar sesión
        </button>
      </form>
    </section>
  );
}

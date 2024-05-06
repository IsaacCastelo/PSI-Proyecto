import { useForm } from 'react-hook-form';

export default function EditEmployee() {
  const { handleSubmit, reset, register } = useForm();

  return (
    <section className='w-full'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar empleados</h1>
        <p className='text-sm text-gray-500'>Editar empleado</p>
      </header>
      <form className='flex flex-col items-center gap-3'>
        <h2>Datos del empleado</h2>
        <input
          placeholder='Nombre de usuario'
          {...register('name', { required: true, value: 'Juan Delgado' })}
          className='rounded shadow p-1'
        />
        <input
          placeholder='Contraseña'
          type='password'
          {...register('password', {
            required: true,
            value: '123456',
          })}
          className='rounded shadow px-1'
        />
        <select
          {...register('role', { required: true })}
          defaultValue={'admin'}
          className='rounded shadow p-1 w-[229px]'
        >
          <option value='' disabled>
            Seleccionar rol
          </option>
          <option value='admin'>Administrador</option>
          <option value='waiter'>Mesero</option>
          <option value='chef'>Cocinero</option>
        </select>

        <button className='bg-blue-600 rounded px-10 text-white font-bold py-1 hover:bg-blue-800 transition-all hover:text-gray-400 '>
          Guardar cambios
        </button>
      </form>
    </section>
  );
}

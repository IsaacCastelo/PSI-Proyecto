import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { postUsuario } from '../../api/api';

export default function AddEmployee() {
  const { handleSubmit, reset, register } = useForm();

  const onSubmit = async ({
    nombre_empleado,
    nombre_usuario,
    contraseña,
    rol,
    repite_contraseña,
  }) => {
    if (contraseña !== repite_contraseña) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    try {
      await postUsuario({
        nombre_empleado,
        nombre_usuario,
        contraseña,
        rol,
      });
      toast.success('Usuario registrado correctamente');
      reset();
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      toast.error('Error al registrar usuario');
    }
  };

  return (
    <section className='w-full'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar empleados</h1>
        <p className='text-sm text-gray-500'>Registrar empleado</p>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center gap-3'
      >
        <h2>Datos del empleado</h2>
        <input
          placeholder='Nombre del empleado'
          {...register('nombre_empleado', { required: true })}
          className='rounded shadow p-1'
        />
        <input
          placeholder='Nombre de usuario'
          {...register('nombre_usuario', { required: true })}
          className='rounded shadow p-1'
        />
        <input
          placeholder='Contraseña'
          type='password'
          {...register('contraseña', {
            required: true,
          })}
          className='rounded shadow px-1'
          minLength={8}
        />
        <input
          className='rounded shadow px-1'
          {...register('repite_contraseña', {
            required: true,
          })}
          placeholder='Repite la contraseña'
          type='password'
          minLength={8}
        />
        <select
          {...register('rol', { required: true })}
          className='rounded shadow p-1 w-[229px]'
        >
          <option value='' disabled>
            Seleccionar rol
          </option>
          <option value='1'>Administrador</option>
          <option value='2'>Mesero</option>
          <option value='3'>Cocinero</option>
        </select>

        <button className='bg-blue-600 rounded px-[76px] text-white font-bold py-1 hover:bg-blue-800 transition-all hover:text-gray-400 '>
          Registrar
        </button>
      </form>
    </section>
  );
}

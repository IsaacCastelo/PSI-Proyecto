import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getUsuario, patchUsuario } from '../../api/api';
import toast from 'react-hot-toast';

export default function EditEmployee() {
  const { handleSubmit, register } = useForm();
  const [usuario, setUsuario] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  let { id } = useParams('id');

  const onSubmit = async (data) => {
    if (data.contraseña !== data.repite_contraseña) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    if (!data.contraseña || data.contraseña.isEmpty()) {
      delete data.contraseña;
      delete data.repite_contraseña;
    }

    try {
      await patchUsuario(id, data);
      toast.success('Usuario actualizado correctamente');
      setIsEdited(false);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      toast.error('Error al actualizar usuario');
    }
  };

  useEffect(() => {
    getUsuario(id).then((usuario) => {
      setUsuario(usuario);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <div className='text-center mt-4'>Cargando...</div>;
  }

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
          {...register('nombre_empleado', {
            required: true,
            value: usuario.nombre_empleado,
          })}
          className='rounded shadow p-1'
          onChange={() => setIsEdited(true)}
        />
        <input
          placeholder='Nombre de usuario'
          {...register('nombre_usuario', {
            required: true,
            value: usuario.nombre_usuario,
          })}
          className='rounded shadow p-1'
          onChange={() => setIsEdited(true)}
        />
        <input
          placeholder='Nueva contraseña'
          type='password'
          {...register('contraseña')}
          className='rounded shadow px-1'
          minLength={8}
          onChange={() => setIsEdited(true)}
        />
        <input
          className='rounded shadow px-1'
          {...register('repite_contraseña')}
          placeholder='Repite la nueva contraseña'
          type='password'
          minLength={8}
          onChange={() => setIsEdited(true)}
        />
        <select
          {...register('rol', { value: usuario.rol })}
          className='rounded shadow p-1 w-[229px]'
          onChange={() => setIsEdited(true)}
        >
          <option value='' disabled>
            Seleccionar rol
          </option>
          <option value='1'>Administrador</option>
          <option value='2'>Mesero</option>
          <option value='3'>Cocinero</option>
        </select>

        <button
          disabled={!isEdited}
          className={
            isEdited
              ? 'bg-blue-600 rounded px-[76px] text-white font-bold py-1 hover:bg-blue-800 transition-all hover:text-gray-400 '
              : ' bg-gray-300 cursor-not-allowed rounded px-[76px] py-1'
          }
        >
          Registrar
        </button>
      </form>
    </section>
  );
}

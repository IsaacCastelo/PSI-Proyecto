import { useForm } from 'react-hook-form';
import { postPlatillo } from '../../api/api';
import toast from 'react-hot-toast';

export default function AddProduct() {
  const { handleSubmit, reset, register } = useForm();

  async function onSubmit(data) {
    if (data.precio <= 0) {
      toast.error('El precio debe ser mayor a 0');
      return;
    }

    if (data.nombre.trim() === '') {
      toast.error('Ingrese un nombre válido');
      return;
    }

    if (data.descripción.trim() === '') {
      toast.error('Ingrese una descripción válida');
      return;
    }

    await postPlatillo(data);
    toast.success('Producto creado');
    reset();
  }

  return (
    <section className='w-full'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar productos</h1>
        <p className='text-sm text-gray-500'>Agregar producto</p>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center gap-3'
      >
        <h2>Detalle del producto</h2>
        <input
          placeholder='Nombre del producto'
          {...register('nombre', { required: true })}
          className='rounded shadow p-1'
        />
        <textarea
          placeholder='Descripción del producto'
          {...register('descripción', {
            required: true,
          })}
          className='rounded shadow w-56 px-0.5'
        />
        <input
          placeholder='Precio del producto'
          {...register('precio', { required: true })}
          className='rounded shadow p-1'
        />
        <button className='bg-blue-600 rounded px-20 text-white font-bold py-1'>
          Crear
        </button>
      </form>
    </section>
  );
}

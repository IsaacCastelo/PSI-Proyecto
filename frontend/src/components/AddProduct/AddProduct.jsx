import { useForm } from 'react-hook-form';

export default function AddProduct() {
  const { handleSubmit, reset, register } = useForm();

  return (
    <section className='w-full'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar productos</h1>
        <p className='text-sm text-gray-500'>Agregar producto</p>
      </header>
      <form className='flex flex-col items-center gap-3'>
        <h2>Detalle del producto</h2>
        <input
          placeholder='Nombre del producto'
          {...register('name', { required: true })}
          className='rounded shadow p-1'
        />
        <textarea
          placeholder='Descripción del producto'
          {...register('detail', {
            required: true,
          })}
          className='rounded shadow w-56 px-0.5'
        />
        <input
          placeholder='Precio del producto'
          {...register('price', { required: true })}
          className='rounded shadow p-1'
        />
        <button className='bg-blue-600 rounded px-20 text-white font-bold py-1'>
          Crear
        </button>
      </form>
    </section>
  );
}

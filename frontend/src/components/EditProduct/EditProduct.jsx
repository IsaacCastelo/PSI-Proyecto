import { useForm } from 'react-hook-form';
import { patchPlatillo, getPlatillo } from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function EditProduct() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [platillo, setPlatillo] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getPlatillo(id).then((data) => {
      setPlatillo(data);
      setIsLoaded(true);
    });
  }, []);

  function handleChange() {
    setIsEdited(true);
  }

  if (!isLoaded) {
    return <div className='text-center mt-4'>Cargando...</div>;
  }

  return (
    <section className='w-full'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar productos</h1>
        <p className='text-sm text-gray-500'>Agregar producto</p>
      </header>
      <form
        onSubmit={handleSubmit((data) => {
          patchPlatillo(id, data);
          toast.success('Producto actualizado, redirigiendo...');
          setTimeout(() => {
            navigate('/products');
          }, 2000);
        })}
        className='flex flex-col items-center gap-3'
      >
        <h2>Detalle del producto</h2>
        <input
          placeholder='Nombre del producto'
          {...register('nombre', { value: platillo.nombre, required: true })}
          className='rounded shadow p-1'
          onChange={handleChange}
        />
        <textarea
          placeholder='Descripción del producto'
          {...register('descripción', {
            value: platillo.descripción,
            required: true,
          })}
          className='rounded shadow w-56 px-0.5'
          onChange={handleChange}
        />
        <input
          placeholder='Precio del producto'
          {...register('precio', { value: platillo.precio, required: true })}
          className='rounded shadow p-1'
          onChange={handleChange}
        />
        <button
          className={
            'bg-blue-600 rounded px-10 text-white font-bold py-1' +
            (isEdited ? '' : ' bg-gray-300 cursor-not-allowed')
          }
          disabled={!isEdited}
        >
          Guardar cambios
        </button>
      </form>
    </section>
  );
}

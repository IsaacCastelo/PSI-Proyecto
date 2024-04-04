import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function AddOrder() {
  const { register, handleSubmit } = useForm();
  const [isLocal, setIsLocal] = useState(true);
  const [pedido, setPedido] = useState({});
  const [detallePedido, setDetallePedido] = useState([]);

  function handleRadioChange(e) {
    if (e.target.value === '2' || e.target.value === '3') {
      setIsLocal(false);
    } else {
      setIsLocal(true);
    }
  }

  function onSubmit(data) {
    if (data.platillo === 'INVALIDO') {
      toast.error('Selecciona un platillo');
      return;
    }
    console.log('working');
  }

  function handlePlatilloChange(e) {
    console.log('Nuevo platillo: ' + e.target.value);
    setPedido({ ...pedido, platillo: e.target.value });
  }

  return (
    <section className='w-full'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>Agregar órden</p>
      </header>
      <div className='flex p-4 shadow-md'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-1/3 shrink-0 flex-col gap-4 px-4'
        >
          <fieldset>
            <legend className='font-semibold'>Tipo de pedido:</legend>
            <div>
              <input
                type='radio'
                id='local'
                {...register('tipoPedido')}
                value='1'
                defaultChecked
                onChange={handleRadioChange}
              />
              <label className='p-1' htmlFor='local'>
                Local
              </label>
            </div>
            <div>
              <input
                type='radio'
                id='domicilio'
                {...register('tipoPedido')}
                value='2'
                onChange={handleRadioChange}
              />
              <label className='p-1' htmlFor='domicilio'>
                Domicilio
              </label>
            </div>
            <div>
              <input
                type='radio'
                id='recoger'
                {...register('tipoPedido')}
                value='3'
                onChange={handleRadioChange}
              />
              <label className='p-1' htmlFor='recoger'>
                Recoger
              </label>
            </div>
            <legend className='font-semibold'>
              {isLocal
                ? 'Introduce la mesa*'
                : 'Introduce el nombre del cliente*'}
            </legend>
            {isLocal ? (
              <input
                id='mesa'
                {...register('mesa')}
                className='border w-full'
                type='number'
                min='1'
                max='10'
              />
            ) : (
              <input
                id='nombre'
                {...register('nombre')}
                className='border w-full'
                type='text'
              />
            )}

            <legend className='font-semibold'>Selecciona el platillo*</legend>
            <select
              className='w-full rounded border p-2'
              id='menu'
              onChangeCapture={handlePlatilloChange}
              defaultValue={'INVALIDO'}
              {...register('platillo', { required: true })}
            >
              <option disabled value='INVALIDO'>
                -- Selecciona un platillo --
              </option>
              <option value='chicharron'>Taco de chicharron</option>
              <option value='tripa'>Taco de tripa</option>
              <option value='buche'>Taco de buche</option>
              <option value='cabeza'>Taco de cabeza</option>
            </select>
            <legend className='font-semibold'>Cantidad*</legend>
            <input
              id='cantidad'
              {...register('cantidad', { required: true })}
              className='w-full border'
              type='number'
              min='1'
            />
            <legend className='font-semibold'>Nota</legend>
            <textarea
              id='nota'
              {...register('nota')}
              className='w-full border'
            ></textarea>
          </fieldset>
          <button
            type='submit'
            className='w-full p-2 bg-gray-700 text-white rounded shadow-md'
          >
            Crear órden
          </button>
        </form>
        <table className='w-full text-left'>
          <thead className='border-b-2 border-black'>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Producto 1</td>
              <td>1</td>
              <td>Nota</td>
              <td>
                <button className='material-icons'>delete_forever</button>
              </td>
            </tr>
            <tr>
              <td>Producto 2</td>
              <td>1</td>
              <td>Nota</td>
              <td>
                <button className='material-icons'>delete_forever</button>
              </td>
            </tr>
            <tr>
              <td>Producto 3</td>
              <td>1</td>
              <td>Nota</td>
              <td>
                <button className='material-icons'>delete_forever</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

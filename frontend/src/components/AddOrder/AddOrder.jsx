import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

AddOrder.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  productos: PropTypes.array.isRequired,
  setProductos: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  onProductDecrease: PropTypes.func.isRequired,
  onProductIncrease: PropTypes.func.isRequired,
  onNoteChange: PropTypes.func.isRequired,
  onProductDelete: PropTypes.func.isRequired,
  onRadioChange: PropTypes.func.isRequired,
  isLocal: PropTypes.bool.isRequired,
  onPlatilloChange: PropTypes.func.isRequired,
  platillos: PropTypes.array.isRequired,
  isDomicilio: PropTypes.bool.isRequired,
};

export default function AddOrder({
  onSubmit,
  productos,
  setProductos,
  total,
  onProductDecrease,
  onProductIncrease,
  onNoteChange,
  onProductDelete,
  onRadioChange,
  isLocal,
  onPlatilloChange,
  platillos,
  isDomicilio,
}) {
  const { handleSubmit, reset, resetField, register } = useForm();

  function handleRadioChange(e) {
    onRadioChange(e);

    resetField('mesa');
    resetField('nombre_cliente');
    resetField('direccion');
  }

  useEffect(() => {
    setProductos([]);
  }, []);

  return (
    <section className='w-full'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>Agregar órden</p>
      </header>
      <div className='flex p-4 shadow-md'>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
          className='flex w-1/3 shrink-0 flex-col gap-4 px-4'
        >
          <fieldset>
            <legend className='font-semibold'>Tipo de pedido:</legend>
            <div>
              <input
                type='radio'
                id='local'
                {...register('tipo_pedido', { defaultChecked: true })}
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
                {...register('tipo_pedido')}
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
                {...register('tipo_pedido')}
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
                {...register('mesa', { required: isLocal, defaultValue: '' })}
                className='border w-full px-1'
                type='number'
                min='1'
                max='10'
              />
            ) : (
              <input
                id='nombre_cliente'
                {...register('nombre_cliente', {
                  required: !isLocal,
                  defaultValue: '',
                })}
                className='border w-full px-1'
                type='text'
              />
            )}
            {isDomicilio && (
              <>
                <legend className='font-semibold'>Dirección*</legend>
                <input
                  id='direccion'
                  {...register('direccion', {
                    required: isDomicilio,
                    defaultValue: '',
                  })}
                  className='border w-full p-1'
                  type='text'
                  placeholder='Dirección'
                />
              </>
            )}
            <legend className='font-semibold'>Selecciona el platillo*</legend>
            <select
              className='w-full rounded border p-2'
              id='menu'
              onChangeCapture={onPlatilloChange}
              defaultValue={'INVALIDO'}
            >
              <option disabled value='INVALIDO'>
                -- Selecciona un platillo --
              </option>
              {platillos
                ? platillos.map((platillo) => (
                    <option key={platillo.id} value={JSON.stringify(platillo)}>
                      {platillo.nombre}
                    </option>
                  ))
                : toast.error('No hay platillos disponibles')}
            </select>
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
            {productos.map((producto, i) => (
              <tr key={i}>
                <td>{producto.nombre}</td>
                <td>
                  <button
                    onClick={() => onProductDecrease(i)}
                    className='material-icons align-middle'
                  >
                    remove
                  </button>
                  {producto?.cantidad}
                  <button
                    onClick={() => onProductIncrease(i)}
                    className='material-icons align-middle'
                  >
                    add
                  </button>
                </td>
                <td>
                  <textarea
                    onInput={(e) => onNoteChange(i, e)}
                    name='nota'
                    className='w-full border'
                  ></textarea>
                </td>
                <td>
                  <button
                    onClick={() => onProductDelete(i)}
                    className='material-icons'
                  >
                    delete_forever
                  </button>
                </td>
              </tr>
            ))}
            {total > 0 && (
              <tr>
                <td></td>
                <td>Total:</td>
                <td>${total}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

EditOrder.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  productos: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  onProductDecrease: PropTypes.func.isRequired,
  onProductIncrease: PropTypes.func.isRequired,
  onNoteChange: PropTypes.func.isRequired,
  onProductDelete: PropTypes.func.isRequired,
  isLocal: PropTypes.bool.isRequired,
  onPlatilloChange: PropTypes.func.isRequired,
  platillos: PropTypes.array.isRequired,
  isDomicilio: PropTypes.bool.isRequired,
  setIsLocal: PropTypes.func.isRequired,
  setIsDomicilio: PropTypes.func.isRequired,
  onRadioChange: PropTypes.func.isRequired,
  setPlatillos: PropTypes.func.isRequired,
  pedido: PropTypes.object.isRequired,
  setPedido: PropTypes.func.isRequired,
  fetchPedido: PropTypes.func.isRequired,
  fetchDetallesPedido: PropTypes.func.isRequired,
};

export default function EditOrder({
  onSubmit,
  productos,
  total,
  pedido,
  setPedido,
  setIsLocal,
  setIsDomicilio,
  onProductDecrease,
  onProductIncrease,
  onNoteChange,
  onProductDelete,
  isLocal,
  onPlatilloChange,
  platillos,
  isDomicilio,
  onRadioChange,
  fetchPedido,
  fetchDetallesPedido,
}) {
  const { register, handleSubmit, resetField } = useForm();
  const { id } = useParams();

  useEffect(() => {
    fetchPedido(id);
    fetchDetallesPedido(id);
  }, []);

  useEffect(() => {
    if (pedido.tipo_pedido === 1) {
      setIsLocal(true);
      setIsDomicilio(false);
    }

    if (pedido.tipo_pedido === 2) {
      setIsDomicilio(true);
      setIsLocal(false);
    }

    if (pedido.tipo_pedido === 3) {
      setIsLocal(false);
      setIsDomicilio(false);
    }
  }, [pedido, setIsLocal, setIsDomicilio]);

  return (
    <section className='w-full'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>Editar órden</p>
      </header>
      <div className='flex p-4 shadow-md'>
        <form
          onSubmit={handleSubmit((data) => {
            data.tipo_pedido = parseInt(pedido.tipo_pedido);
            onSubmit(data, pedido.id);
          })}
          className='flex w-1/3 shrink-0 flex-col gap-4 px-4'
        >
          <fieldset>
            <legend className='font-semibold'>Tipo de pedido:</legend>
            <div>
              <input
                type='radio'
                id='local'
                {...register('tipo_pedido')}
                value='1'
                checked={pedido.tipo_pedido === 1}
                onClick={(e) => {
                  onRadioChange(e);
                  resetField('nombre');
                  resetField('direccion');
                  setPedido({ ...pedido, tipo_pedido: 1 });
                }}
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
                checked={pedido.tipo_pedido === 2}
                onClick={(e) => {
                  onRadioChange(e);
                  resetField('mesa');
                  setPedido({ ...pedido, tipo_pedido: 2 });
                }}
                value='2'
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
                checked={pedido.tipo_pedido === 3}
                onClick={(e) => {
                  onRadioChange(e);
                  resetField('mesa');
                  resetField('direccion');
                  setPedido({ ...pedido, tipo_pedido: 3 });
                }}
              />
              <label className='p-1' htmlFor='recoger'>
                Recoger
              </label>
            </div>
            <legend className='font-semibold'>
              {isLocal ? 'Mesa*' : 'Nombre del cliente*'}
            </legend>
            {isLocal ? (
              <input
                id='mesa'
                {...register('mesa', {
                  required: isLocal,
                  value: pedido.mesa,
                  defaultValue: '',
                })}
                defaultValue={pedido.mesa}
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
                  value: pedido.nombre_cliente,
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
                    value: pedido.direccion,
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
            Guardar
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
                    defaultValue={producto.notas}
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

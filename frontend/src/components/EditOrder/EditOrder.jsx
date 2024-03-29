export default function EditOrder() {
  return (
    <section className='w-full'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>
          Editar órden <br />
          Selecciona un artículo de la tabla para ver sus acciones
        </p>
      </header>
      <div className='flex p-4 shadow-md'>
        <form className='flex w-1/3 shrink-0 flex-col gap-4 px-4'>
          <fieldset>
            <legend className='font-semibold'>Introduce la mesa*</legend>
            <input className='border w-full' type='number' min='1' max='10' />
            <legend className='font-semibold'>Selecciona el platillo*</legend>
            <select
              className='w-full rounded border p-2'
              id='menu'
              name='dishes'
              required
            >
              <option value='chicharron'>Taco de chicharron</option>
              <option value='tripa'>Taco de tripa</option>
              <option value='buche'>Taco de buche</option>
              <option value='cabeza'>Taco de cabeza</option>
            </select>
            <legend className='font-semibold'>Cantidad*</legend>
            <input className='w-full border' type='number' min='1' />
            <legend className='font-semibold'>Nota</legend>
            <textarea className='w-full border'></textarea>
          </fieldset>
          <button
            type='submit'
            className='w-full p-2 bg-gray-700 text-white rounded shadow-md'
          >
            Guardar
          </button>
          <button
            type='submit'
            className='w-full p-2 bg-blue-600 text-white rounded shadow-md'
          >
            Editar
          </button>
          <button
            type='submit'
            className='w-full p-2 bg-red-600 text-white rounded shadow-md'
          >
            Eliminar
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
            </tr>
            <tr>
              <td>Producto 2</td>
              <td>1</td>
              <td>Nota</td>
            </tr>
            <tr>
              <td>Producto 3</td>
              <td>1</td>
              <td>Nota</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

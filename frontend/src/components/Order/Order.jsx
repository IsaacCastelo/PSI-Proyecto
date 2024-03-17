export default function Order() {
  return (
    <section className='w-full p-6 px-9'>
      <header className='py-3'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>Orden #321</p>
      </header>
      <div className='border shadow-xl p-6'>
        <table className='w-full text-left'>
          <thead>
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
      <button className='w-full my-3 p-2 bg-green-700 text-white rounded shadow-md'>
        Marcar como completada(No pagada)
      </button>
    </section>
  );
}

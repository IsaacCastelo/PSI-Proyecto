export default function EditOrders() {
  function handleOrderClick() {
    window.location.href = '/edit-order';
  }

  return (
    <section className='w-full p-6'>
      <header className='py-3'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>Selecciona órden a editar</p>
      </header>
      <div className='p-6 border shadow-xl'>
        <table className='flex-col w-full text-center'>
          <thead className='border-b-2 border-black'>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Juanito</td>
              <td>
                <button className='material-icons' onClick={handleOrderClick}>
                  edit
                </button>
              </td>
            </tr>
            <tr>
              <td>Pedrito</td>
              <td>
                <button className='material-icons'>edit</button>
              </td>
            </tr>
            <tr>
              <td>Jaimito</td>
              <td>
                <button className='material-icons'>edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

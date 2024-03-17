export default function ViewOrders() {
  function handleOrderClick() {
    window.location.href = '/order';
  }

  return (
    <section className='w-full p-6'>
      <header className='py-3'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>Ver órdenes activas(no pagadas)</p>
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
                <button onClick={handleOrderClick}>
                  <span className='material-icons'>remove_red_eye</span>
                </button>
              </td>
            </tr>
            <tr>
              <td>Pedrito</td>
              <td>
                <button>
                  <span className='material-icons'>remove_red_eye</span>
                </button>
              </td>
            </tr>
            <tr>
              <td>Jaimito</td>
              <td>
                <button>
                  <span className='material-icons'>remove_red_eye</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

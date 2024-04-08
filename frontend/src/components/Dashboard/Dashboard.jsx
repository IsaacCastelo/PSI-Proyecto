export default function Dashboard() {
  function handleAddOrderClick() {
    window.location.href = '/add-order';
  }

  function handleEditOrderClick() {
    window.location.href = '/edit-orders';
  }

  function handleViewOrderClick() {
    window.location.href = '/view-orders';
  }

  function handlePayOrderClick() {
    window.location.href = '/pay-orders';
  }

  function handleDeleteOrderClick() {
    window.location.href = '/delete-order';
  }

  return (
    <section className='w-full p-12'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>
          Permite al mesero crear, modificar, editar y cerrar ordenes
        </p>
      </header>
      <div className='flex flex-wrap p-4 gap-8 justify-center shadow-md button'>
        <button
          onClick={handleAddOrderClick}
          className='flex justify-around w-52 p-6 shadow-md
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Agregar órden
          <span className='material-icons py-1'>add_circle</span>
        </button>
        <button
          onClick={handleViewOrderClick}
          className='flex justify-around w-52 p-6 shadow-md
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Ver órden
          <span className='material-icons py-1'>remove_red_eye</span>
        </button>
        <button
          onClick={handleEditOrderClick}
          className='flex justify-around w-52 p-6 shadow-md
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Editar órden
          <span className='material-icons py-1'>edit</span>
        </button>
        <button
          onClick={handleDeleteOrderClick}
          className='flex justify-around w-52 p-6 shadow-md
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Cancelar órden
          <span className='material-icons py-1'>cancel</span>
        </button>
        <button
          onClick={handlePayOrderClick}
          className='flex justify-around w-52 p-6 shadow-md
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Pagar órden
          <span className='material-icons py-1'>attach_money</span>
        </button>
      </div>
    </section>
  );
}

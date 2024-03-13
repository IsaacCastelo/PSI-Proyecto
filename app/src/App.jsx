import './App.css';
import logo from './images/logo.png';

function SideNav() {
  return (
    <nav className='flex flex-col w-72 h-screen bg-gray-700 text-white px-5'>
      <img src={logo} alt='logo' />
      <ul className=' flex py-1 flex-col gap-4'>
        <li className='flex nav-link justify-between'>
          <a href='#'>Administrar empleados</a>
          <span className='material-icons '>manage_accounts</span>
        </li>
        <li className='flex nav-link justify-between'>
          <a href='#'>Administrar productos</a>
          <span className='material-icons '>manage_search</span>
        </li>
        <li className='flex nav-link justify-between'>
          <a className='' href='#'>
            Administrar ordenes
          </a>
          <span className='material-icons'>library_books</span>
        </li>
      </ul>
    </nav>
  );
}

function Dashboard() {
  return (
    <section className='w-full p-12'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>
          Permite al mesero crear, modificar, editar y cerrar ordenes
        </p>
      </header>
      <div className='flex flex-wrap p-4 gap-8 justify-center shadow-md'>
        <div className='flex w-fit p-8 shadow-md'>
          Agregar órden
          <span className='material-icons p-1'>add_circle</span>
        </div>
        <div className='flex w-fit p-8 shadow-md'>
          Ver órden
          <span className='material-icons p-1'>remove_red_eye</span>
        </div>
        <div className='flex w-fit p-8 shadow-md'>
          Editar órden
          <span className='material-icons p-1'>edit</span>
        </div>
        <div className='flex w-fit p-8 shadow-md'>
          Cancelar órden
          <span className='material-icons p-1'>cancel</span>
        </div>
        <div className='flex w-fit p-8 shadow-md'>
          Pagar órden
          <span className='material-icons p-1'>attach_money</span>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <main className='flex h-screen'>
      <SideNav />
      <Dashboard />
    </main>
  );
}

export default App;

import logo from '../../images/logo.png';

export default function SideNav() {
  return (
    <nav className='flex flex-col w-72 h-screen bg-gray-700 text-white px-5'>
      <img src={logo} alt='logo' />
      <ul className=' flex py-1 flex-col gap-4'>
        <li className='flex nav-link justify-between p-1'>
          <a href='#'>Administrar empleados</a>
          <span className='material-icons '>manage_accounts</span>
        </li>
        <li className='flex nav-link justify-between p-1'>
          <a href='#'>Administrar productos</a>
          <span className='material-icons '>manage_search</span>
        </li>
        <li className='flex nav-link justify-between bg-gray-500 rounded p-1'>
          <a href='/dashboard'>Administrar ordenes</a>
          <span className='material-icons'>library_books</span>
        </li>
      </ul>
    </nav>
  );
}

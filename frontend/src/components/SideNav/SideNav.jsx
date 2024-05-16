import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';

export default function SideNav() {
  const [lastClicked, setLastClicked] = useState('dashboard');
  const { logout } = useAuth();

  const handleClick = (element) => {
    setLastClicked(element);
  };

  function handleLogout() {
    logout();
  }

  return (
    <nav className='flex flex-col w-fit h-screen bg-gray-700 text-white px-5'>
      <img src={logo} alt='logo' className='h-fit w-[328px]' />
      <ul className='flex py-1 flex-col gap-4'>
        <li
          className={`flex nav-link justify-between p-1 rounded ${
            lastClicked === 'dashboard' ? 'bg-gray-500' : ''
          }`}
        >
          <Link to='dashboard' onClick={() => handleClick('dashboard')}>
            Administrar ordenes
          </Link>
          <span className='material-icons'>library_books</span>
        </li>
        <li
          className={`flex nav-link justify-between p-1 rounded ${
            lastClicked === 'products' ? 'bg-gray-500' : ''
          }`}
        >
          <Link to='products' onClick={() => handleClick('products')}>
            Administrar productos
          </Link>
          <span className='material-icons'>manage_search</span>
        </li>
        <li
          className={`flex nav-link justify-between p-1 rounded ${
            lastClicked === 'employees' ? 'bg-gray-500' : ''
          }`}
        >
          <Link to='employees' onClick={() => handleClick('employees')}>
            Administrar empleados
          </Link>
          <span className='material-icons'>manage_accounts</span>
        </li>
      </ul>
      <Link
        to='login'
        className='bg-red-500 rounded p-1 text-white hover:bg-red-700 transition-all mt-auto mb-3 text-center'
        onClick={handleLogout}
      >
        Cerrar sesión
      </Link>
    </nav>
  );
}

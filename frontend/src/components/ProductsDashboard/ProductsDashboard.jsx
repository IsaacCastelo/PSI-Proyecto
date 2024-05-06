import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductsDashboard() {
  const navigate = useNavigate();

  function handleAddProduct() {
    navigate('/add-product');
  }

  function handleEditProductClick() {
    navigate('/view-products');
  }

  function handleViewProductsClick() {
    navigate('/view-products');
  }

  function handelDeleteProductClick() {
    navigate('/view-products');
  }

  useEffect(() => {
    document.title = 'Administrar productos';
  }, []);

  return (
    <section className='w-full p-12'>
      <header className='p-6'>
        <h1 className='text-2xl'>Administrar productos</h1>
        <p className='text-sm text-gray-500'>
          Permite la gestión de los productos del restaurante
        </p>
      </header>
      <div className='flex flex-wrap p-4 gap-8 justify-center shadow-md button'>
        <button
          onClick={handleAddProduct}
          className='flex justify-around w-52 p-6 shadow-md items-center
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Agregar producto
          <span className='material-icons py-1'>add_circle</span>
        </button>
        <button
          onClick={handleViewProductsClick}
          className='flex justify-around w-52 p-6 shadow-md items-center
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Ver productos
          <span className='material-icons py-1'>remove_red_eye</span>
        </button>
        <button
          onClick={handleEditProductClick}
          className='flex justify-around w-52 p-6 shadow-md items-center
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Editar producto
          <span className='material-icons py-1'>edit</span>
        </button>
        <button
          onClick={handelDeleteProductClick}
          className='flex justify-around w-52 p-6 shadow-md items-center
             transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-gray-700 '
        >
          Eliminar producto
          <span className='material-icons py-1'>cancel</span>
        </button>
      </div>
    </section>
  );
}

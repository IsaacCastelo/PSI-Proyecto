import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { getPlatillos } from '../../api/api';
import './App.css';
import SideNav from '../SideNav/SideNav';
import OpenOrders from '../OpenOrders/OpenOrders';
import OpenOrder from '../OpenOrder/OpenOrder';
import Dashboard from '../Dashboard/Dashboard';
import AddOrder from '../AddOrder/AddOrder';
import EditOrder from '../EditOrder/EditOrder';
import ViewOrders from '../ViewOrders/ViewOrders';
import Order from '../Order/Order';
import DeleteOrders from '../DeleteOrders/DeleteOrders';

function App() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const { resetField } = useForm();
  const [isLocal, setIsLocal] = useState(true);
  const [platillos, setPlatillos] = useState([]);

  /**
   * Add a product to the order.
   * @param {*} e - The event object.
   */
  function handlePlatilloChange(e) {
    const producto = JSON.parse(e.target.value);
    producto.cantidad = 1;
    setTotal(total + producto.precio);
    setProductos([...productos, producto]);
  }

  /**
   * Handle the radio change event.
   * @param {*} e - The event object.
   */
  function handleRadioChange(e) {
    if (e.target.value === '2' || e.target.value === '3') {
      setIsLocal(false);
    } else {
      setIsLocal(true);
    }
    resetField('mesa');
    resetField('nombre');
  }

  /**
   * Handle the form submission.
   * @param {Object} data - The form data.
   */
  function onNewOrderSubmit(data) {
    if (productos.length === 0) {
      toast.error('Debes agregar al menos un platillo');
      return;
    }
    console.log(data);
  }

  function onEditOrderSubmit(data) {
    if (productos.length === 0) {
      toast.error('Debes agregar al menos un platillo');
      return;
    }
    console.log(data);
  }

  /**
   * Increase the quantity of a product in the order.
   * @param {*} id - The index of the product to increase.
   */
  function handleProductIncrease(id) {
    const newProductos = [...productos];
    if (newProductos[id].cantidad === undefined) {
      newProductos[id].cantidad = 1;
    }
    newProductos[id].cantidad += 1;
    setTotal(total + newProductos[id].precio);
    setProductos(newProductos);
  }

  /**
   * Decrease the quantity of a product in the order.
   * @param {*} id - The index of the product to decrease.
   */
  function handleProductDecrease(id) {
    const newProductos = [...productos];
    if (newProductos[id].cantidad > 1) {
      newProductos[id].cantidad -= 1;
      setTotal(total - newProductos[id].precio);
      setProductos(newProductos);
    }
  }

  /**
   * Delete a product from the order.
   * @param {*} id - The index of the product to delete.
   */
  function handleProductDelete(id) {
    const newProductos = [...productos];
    newProductos.splice(id, 1);
    setTotal(total - productos[id].precio);
    setProductos(newProductos);
  }

  /**
   * Handle the product note.
   * @param {*} id - The index of the product.
   * @param {*} e - The event object.
   */
  function handleProductNote(id, e) {
    const newProductos = [...productos];
    newProductos[id].nota = e.target.value;
    setProductos(newProductos);
  }

  /**
   * useEffect hook to fetch platillos from the API initially.
   */
  useEffect(() => {
    getPlatillos().then((data) => {
      setPlatillos(data);
    });
  }, []);

  return (
    <main className='flex h-screen'>
      <SideNav />
      <Router>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route
            path='/add-order'
            element={
              <AddOrder
                onPlatilloChange={handlePlatilloChange}
                onProductDelete={handleProductDelete}
                onProductIncrease={handleProductIncrease}
                onProductDecrease={handleProductDecrease}
                onNoteChange={handleProductNote}
                productos={productos}
                total={total}
                onRadioChange={handleRadioChange}
                isLocal={isLocal}
                onSubmit={onNewOrderSubmit}
                platillos={platillos}
              />
            }
          />
          <Route
            path='/edit-order'
            element={
              <EditOrder
                onPlatilloChange={handlePlatilloChange}
                setTotal={setTotal}
                total={total}
                onProductDelete={handleProductDelete}
                onProductIncrease={handleProductIncrease}
                onProductDecrease={handleProductDecrease}
                onNoteChange={handleProductNote}
                productos={productos}
                onRadioChange={handleRadioChange}
                isLocal={isLocal}
                onSubmit={onEditOrderSubmit}
                platillos={platillos}
              />
            }
          />
          <Route path='/view-orders' element={<ViewOrders />} />
          <Route path='/pay-orders' element={<OpenOrders />} />
          <Route path='/order' element={<Order />} />
          <Route path='/pay-order' element={<OpenOrder />} />
          <Route path='/delete-order' element={<DeleteOrders />} />
          <Route path='*' element={<Navigate to='/dashboard' />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;

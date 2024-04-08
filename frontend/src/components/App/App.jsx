import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import {
  deleteDetallePedido,
  getDetallesPedido,
  getPedido,
  getPlatillos,
  postDetallePedido,
  postPedido,
  putDetallePedido,
  putPedido,
} from '../../api/api';
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
import EditOrders from '../EditOrders/EditOrders';
import DeleteOrder from '../DeleteOrder/DeleteOrder';

function App() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLocal, setIsLocal] = useState(true);
  const [platillos, setPlatillos] = useState([]);
  const [isDomicilio, setIsDomicilio] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [pedido, setPedido] = useState({});
  /**
   * Add a product to the order.
   * @param {*} e - The event object.
   */
  function handlePlatilloChange(e) {
    const producto = JSON.parse(e.target.value);
    producto.cantidad = 1;
    producto.nota = '';
    setTotal(total + producto.precio);
    setProductos([...productos, producto]);
    e.target.value = 'INVALIDO';
  }

  /**
   * Handle the radio change event.
   * @param {*} e - The event object.
   */
  function handleRadioChange(e) {
    if (e.target.value === '2') setIsDomicilio(true);
    else setIsDomicilio(false);

    if (e.target.value === '3' || e.target.value === '2') {
      setIsLocal(false);
    }

    if (e.target.value === '1') setIsLocal(true);
  }

  /**
   * Handle the form submission.
   * @param {Object} data - The form data.
   */
  async function onNewOrderSubmit(data) {
    if (productos.length === 0) {
      toast.error('Debes agregar al menos un platillo');
      return;
    }

    if (isLocal && data.mesa === '') {
      toast.error('Debes introducir la mesa');
      return;
    }

    if (!isLocal && data.nombre_cliente === '') {
      toast.error('Debes introducir el nombre del cliente');
      return;
    }

    await postPedido(data)
      .then((data) => {
        productos.forEach((producto) => {
          postDetallePedido({
            cantidad: producto.cantidad,
            precio: producto.precio,
            notas: producto.nota,
            platillo: producto.id,
            pedido: data.id,
          });
        });
        return data;
      })
      .then((data) => {
        if (data) {
          toast.success('Pedido creado correctamente!');
        } else {
          toast.error('Error al agregar el pedido, intenta de nuevo');
          return;
        }
        setProductos([]);
        setTotal(0);
        setIsLocal(true);
        setIsDomicilio(false);
      });
  }

  function onEditOrderSubmit(data, id) {
    if (productos.length === 0) {
      toast.error('Debes agregar al menos un platillo');
      return;
    }

    if (isLocal && data.mesa === '') {
      toast.error('Debes introducir la mesa');
      return;
    }

    if (!isLocal && data.nombre_cliente === '') {
      toast.error('Debes introducir el nombre del cliente');
      return;
    }

    if (isDomicilio && data.direccion === '') {
      toast.error('Debes introducir la dirección');
      return;
    }

    putPedido(id, data)
      .then((data) => {
        productos.forEach((producto) => {
          if (producto.pedido === undefined) {
            postDetallePedido({
              cantidad: producto.cantidad,
              precio: producto.precio,
              notas: producto.nota,
              platillo: producto.id,
              pedido: id,
            });
          }
          if (producto.pedido !== undefined)
            putDetallePedido(producto.id, {
              cantidad: producto.cantidad,
              precio: producto.precio,
              notas: producto.nota,
              platillo: producto.platillo,
              pedido: id,
            });
        });
        return data;
      })
      .then((data) => {
        if (data) {
          toast.success('Pedido editado correctamente');
        } else {
          toast.error('Error al editar el pedido, intenta de nuevo');
          return;
        }
      });
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
    setTotal(total - productos[id].precio * productos[id].cantidad);
    setProductos(newProductos);
  }

  function handleProductEditDelete(id) {
    const newProductos = [...productos];
    newProductos.splice(id, 1);
    setTotal(total - productos[id].precio * productos[id].cantidad);
    setProductos(newProductos);

    deleteDetallePedido(productos[id].id).then((res) => {
      if (res?.status === 204) {
        toast.success('Producto eliminado correctamente');
      } else {
        toast.error(
          'Error al eliminar el producto, refresca la página e intenta de nuevo'
        );
        return;
      }
    });
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

  async function fetchPedido(id) {
    const pedido = await getPedido(id);
    setPedido(pedido);
  }
  async function fetchDetallesPedido(id) {
    const productos = await getDetallesPedido(id);
    setProductos(productos);
  }

  function fetchPlatillos() {
    getPlatillos().then((platillos) => {
      setPlatillos(platillos);
    });
  }

  useEffect(() => {
    fetchPlatillos();
  }, []);

  useEffect(() => {
    productos.forEach((producto) => {
      if (producto.nombre === undefined)
        producto.nombre = platillos[producto.platillo - 1]?.nombre;
    });
    const total = productos.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
    setTotal(total);
  }, [productos]);

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
                isDomicilio={isDomicilio}
              />
            }
          />
          <Route
            path='/edit-orders'
            element={<EditOrders pedidos={pedidos} setPedidos={setPedidos} />}
          />
          <Route
            path='/edit-order/:id'
            element={
              <EditOrder
                onPlatilloChange={handlePlatilloChange}
                setTotal={setTotal}
                total={total}
                onProductDelete={handleProductEditDelete}
                onProductIncrease={handleProductIncrease}
                onProductDecrease={handleProductDecrease}
                onNoteChange={handleProductNote}
                productos={productos}
                onRadioChange={handleRadioChange}
                isLocal={isLocal}
                isDomicilio={isDomicilio}
                onSubmit={onEditOrderSubmit}
                platillos={platillos}
                setPlatillos={setPlatillos}
                setIsDomicilio={setIsDomicilio}
                setIsLocal={setIsLocal}
                setProductos={setProductos}
                pedido={pedido}
                setPedido={setPedido}
                fetchPedido={fetchPedido}
                fetchDetallesPedido={fetchDetallesPedido}
              />
            }
          />
          <Route
            path='/view-orders'
            element={<ViewOrders pedidos={pedidos} setPedidos={setPedidos} />}
          />
          <Route
            path='/order/:id'
            element={
              <Order
                pedido={pedido}
                productos={productos}
                total={total}
                fetchPedido={fetchPedido}
                fetchDetallesPedido={fetchDetallesPedido}
              />
            }
          />
          <Route
            path='/pay-orders'
            element={<OpenOrders pedidos={pedidos} setPedidos={setPedidos} />}
          />
          <Route
            path='/pay-order/:id'
            element={
              <OpenOrder
                total={total}
                pedido={pedido}
                productos={productos}
                fetchDetallesPedido={fetchDetallesPedido}
                fetchPedido={fetchPedido}
              />
            }
          />
          <Route
            path='/delete-orders'
            element={<DeleteOrders pedidos={pedidos} setPedidos={setPedidos} />}
          />
          <Route
            path='/delete-order/:id'
            element={
              <DeleteOrder
                total={total}
                pedido={pedido}
                productos={productos}
                fetchDetallesPedido={fetchDetallesPedido}
                fetchPedido={fetchPedido}
              />
            }
          />
          <Route path='*' element={<Navigate to='/dashboard' />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;

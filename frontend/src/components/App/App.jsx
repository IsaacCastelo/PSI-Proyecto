import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import SideNav from '../SideNav/SideNav';
import OpenOrders from '../OpenOrders/OpenOrders';
import OpenOrder from '../OpenOrder/OpenOrder';
import Dashboard from '../Dashboard/Dashboard';
import AddOrder from '../AddOrder/AddOrder';
import EditOrder from '../EditOrder/EditOrder';
import ViewOrders from '../ViewOrders/ViewOrders';
import Order from '../Order/Order';

function App() {
  return (
    <main className='flex h-screen'>
      <SideNav />
      <Router>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/add-order' element={<AddOrder />} />
          <Route path='/edit-order' element={<EditOrder />} />
          <Route path='/view-orders' element={<ViewOrders />} />
          <Route path='/pay-orders' element={<OpenOrders />} />
          <Route path='/order' element={<Order />} />
          <Route path='/pay-order' element={<OpenOrder />} />
          <Route path='*' element={<Navigate to='/dashboard' />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;

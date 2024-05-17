import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './components/App/App';
import 'material-icons/iconfont/filled.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Toaster />
    <App />
  </>
);

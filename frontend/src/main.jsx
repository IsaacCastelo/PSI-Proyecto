import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './components/App/App';
import 'material-icons/iconfont/filled.css';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>
);

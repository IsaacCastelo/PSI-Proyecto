import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
//import { ClerkProvider } from '@clerk/clerk-react';
import App from './components/App/App';
import 'material-icons/iconfont/filled.css';
import React from 'react';

//const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  //<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <>
    <React.StrictMode>
      <Toaster />
      <App />
    </React.StrictMode>
  </>

  // </ClerkProvider>
);

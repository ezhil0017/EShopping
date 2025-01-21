import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './route/index.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);

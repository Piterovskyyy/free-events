import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import { LoadScript } from '@react-google-maps/api';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <App />
      </LoadScript>
    </UserProvider>

  </StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/page/login.css';
import './styles/page/location.css';
import './styles/page/add_location.css';
import './styles/page/edit_location.css';
import './styles/page/home_admin.css';
import './styles/global.css';
import AppProvider from './appState/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);



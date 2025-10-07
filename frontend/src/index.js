import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { store } from './store/store';
import ThemeWrapper from './ThemeWrapper';
import './index.css';

// Mount React App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeWrapper>
          <CssBaseline />
          <App />
        </ThemeWrapper>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

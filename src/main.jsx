import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import App from './App.jsx';
import AppToastContainer from './components/common/AppToastContainer/AppToastContainer.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <AppToastContainer />
    </Provider>
  </StrictMode>
);

import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import { store } from './store';
import './firebase';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

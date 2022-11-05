import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

// redux
import store from './redux/config/configStore';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


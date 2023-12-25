import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios'
// bootstrap 樣式
import './stylesheet/all.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { HashRouter } from 'react-router-dom';
// axios 預設URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

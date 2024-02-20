import React from 'react';
import ReactDOM from 'react-dom/client';
import './HomeBeforeLogin.module.css';
import './global.css'
//import HomeBeforeLogin from './HomeBeforeLogin';
//import Cart from './App';
//import App from './App';
import Router1 from './router';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router1/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

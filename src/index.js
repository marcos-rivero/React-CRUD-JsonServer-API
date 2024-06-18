import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CrudApp from './Componentes/CrudApp.jsx';
import reportWebVitals from './reportWebVitals';
import CrudJsonAPI from './Componentes/CrudJsonApi.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
    <CrudJsonAPI />  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

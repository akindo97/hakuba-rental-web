import { Routes, Route, BrowserRouter as Router, } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './component/i18next';
import { Provider } from 'react-redux';
import store from './ReduxStore';

import F_home from './component/S_home'
import F_hear from './component/S_head';
import Frepre from './component/Srepre';
import Fuserf from './component/Suserf';
import Fitems from './component/Sitems';
import Fqrshw from './component/Sqrshw';
import reportWebVitals from './reportWebVitals';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <F_hear />
      <Routes>
        <Route path='/' element={<F_home />} />
        <Route path='/represen' element={<Frepre />} />
        <Route path='/userinfo' element={<Fuserf />} />
        <Route path='/itemselect' element={<Fitems />} />
        <Route path='/qrshow' element={<Fqrshw />} />
      </Routes>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

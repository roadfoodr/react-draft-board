import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import Add from './Add';

import './Styles/Global.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<App/>}></Route>
    <Route path="/add/:franchise/:nameLast/:nameFirst/:position/:team/:salary/:rating" element={<Add/>}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

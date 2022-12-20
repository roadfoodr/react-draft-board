import React from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Add from './Add';
import Board from './Board';

import './config';
import './Styles/Global.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Board/>}></Route>
    <Route path="/year/:year" element={<Board/>}></Route>
    <Route path="/demo" element={<Navigate to="/year/demo" />} />
    <Route path="/api/add/:apiKey/:year/:franchise/:nameLast/:nameFirst/:position/:team/:salary/:rating" 
           element={<Add/>}></Route>
    </Routes>
  </BrowserRouter>
);

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Create from './components/Create';
import Home from "./components/Home";
import Read from "./components/Read";
import Edit from "./components/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
      <h1>Autor: Adrian Ramos</h1>
    </BrowserRouter>
  );
}

export default App;

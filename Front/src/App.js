import React from 'react';
import './App.css';
//import "./components/buscador/searcher"
//import Searcher from './components/buscador/searcher';
import Home from "./components/home/home"
import Details from "./components/details/details"
import Creator from "./components/creator/creator"
import { Route, Routes , HashRouter as Router } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route exact path="/details/:id" element={<Details />}></Route>
      <Route exact path="/creator" element={<Creator />}></Route>
      <Route exact path="/" element={<Home />}></Route> 
    </Routes>
  );
}

export default App;

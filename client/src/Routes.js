import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Articles from './pages/Articles';
import Categories from './pages/Categories';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Commande from "./pages/Commande"


const Index = () => {

  return (
    <div>
      <Navbar />
      <Routes>     
        <Route exact path="/" element={<Categories/>} /> 
        <Route path="/articles" element={<Articles/>} />
        <Route path="/commande" element={<Commande/>} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default Index;

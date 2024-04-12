import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component

import Login from './hooks/login';
import Articles from './pages/Articles';
import Categories from './pages/Categories';
import Commande from './pages/Commande';

const Index = () => {
  const location = useLocation(); // Get the current location

  // Define an array of routes where you want to show the Navbar
  const showNavbarRoutes = ['/admin/articles', '/admin/categories' , '/admin/commande'  ];

  // Check if the current location is in the showNavbarRoutes array
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />} {/* Conditionally render the Navbar */}
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/articles" element={<Articles />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/commande" element={<Commande />} />
      </Routes>
    </div>
  );
};

export default Index;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BranchesPage from "./pages/BranchesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [cartItems, setCartItems] = useState({});

  const toggleItemInCart = (itemType) => {
    setCartItems((currentItems) => {
      const newItemState = { ...currentItems };
      // Toggle the state: if true (in cart), remove it, else add it
      if (newItemState[itemType]) {
        delete newItemState[itemType]; // Remove from cart
      } else {
        newItemState[itemType] = true; // Add to cart
      }
      return newItemState;
    });
  };

  const totalItems = Object.values(cartItems).length;

  return (
    <Router>
      <Header cartCount={totalItems} />
      <Routes>
        <Route path="/" element={<HomePage toggleItemInCart={toggleItemInCart} cartItems={cartItems} />} />
        <Route path="/branches" element={<BranchesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

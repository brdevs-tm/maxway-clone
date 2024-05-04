import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BranchesPage from "./pages/BranchesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import CartPage from "./pages/CartPage";

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cartItems from localStorage
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? JSON.parse(savedItems) : {};
  });

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleItemInCart = (itemType) => {
    setCartItems((currentItems) => {
      const updatedItems = { ...currentItems };
      if (updatedItems[itemType]) {
        delete updatedItems[itemType];
      } else {
        updatedItems[itemType] = true;
      }
      return updatedItems;
    });
  };

  const cartCount = Object.keys(cartItems).length;

  return (
    <Router>
      <Header cartCount={cartCount} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              toggleItemInCart={toggleItemInCart}
              cartItems={cartItems}
            />
          }
        />
        <Route path="/branches" element={<BranchesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

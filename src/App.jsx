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
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? JSON.parse(savedItems) : {};
  });
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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

  const switchToSignUp = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  const switchToLogin = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  const closeModals = () => {
    setShowSignUpModal(false);
    setShowLoginModal(false);
  };

  return (
    <Router>
      <Header
        cartCount={cartCount}
        openSignUp={() => setShowSignUpModal(true)}
        openLogin={() => setShowLoginModal(true)}
      />
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
      {showSignUpModal && (
        <SignUpModal closeModal={closeModals} switchToLogin={switchToLogin} />
      )}
      {showLoginModal && (
        <LoginModal closeModal={closeModals} switchToSignUp={switchToSignUp} />
      )}
    </Router>
  );
};

export default App;

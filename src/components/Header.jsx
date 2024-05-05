import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { Cart, Login } from "../assets/img/Icons";
import LanguageSelect from "./Option";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const Header = ({ cartCount }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'login' or 'signup'

  const openModal = (type) => {
    setShowModal(true);
    setModalType(type);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  const switchModal = () => {
    setModalType(modalType === "login" ? "signup" : "login");
  };

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 border border-gray-100 ${
      isActive ? "bg-gray-100" : "bg-white"
    } rounded-[6px] p-2`;

  return (
    <header className="fixed top-0 right-0 left-0 z-10 bg-white">
      <div className="containerown">
        <nav className="flex items-center justify-between">
          <div className="nav-left py-6">
            <NavLink to="/" className="flex items-center gap-2">
              <img src={logo} alt="MaxWay logo" />
              <span className="font-bold">MaxWay</span>
            </NavLink>
          </div>
          <div className="nav-center">
            <ul className="flex gap-2">
              <li>
                <NavLink
                  to="/"
                  className={getNavLinkClass({
                    isActive: window.location.pathname === "/",
                  })}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/branches"
                  className={getNavLinkClass({
                    isActive: window.location.pathname === "/branches",
                  })}
                >
                  Branches
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={getNavLinkClass({
                    isActive: window.location.pathname === "/about",
                  })}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={getNavLinkClass({
                    isActive: window.location.pathname === "/contact",
                  })}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="nav-right flex items-center gap-4">
            <LanguageSelect />
            <NavLink to="/cart" className="relative flex items-center">
              <Cart />
              {cartCount > 0 && (
                <span className="absolute top-[-10px] right-0 badge bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                  {cartCount}
                </span>
              )}
            </NavLink>
            <button
              aria-label="Login"
              onClick={() => openModal("login")}
              className="flex items-center"
            >
              <Login />
            </button>
          </div>
        </nav>
      </div>
      {showModal &&
        (modalType === "login" ? (
          <LoginModal closeModal={closeModal} switchModal={switchModal} />
        ) : (
          <SignUpModal closeModal={closeModal} switchModal={switchModal} />
        ))}
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { Cart, CloseMenu, HamburgerMenu, Login } from "../assets/img/Icons";
import LanguageSelect from "./Option";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const Header = ({ cartCount }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 border border-gray-100 ${
      isActive ? "bg-gray-100" : "bg-white"
    } rounded-[6px] p-2`;

  return (
    <header className="fixed top-0 right-0 left-0 z-10 bg-white">
      <div className="containerown">
        <nav className="flex items-center justify-between">
          <div className="nav-left py-6 flex">
            <button onClick={toggleMenu} className="block sm:hidden">
              {showMenu ? <CloseMenu /> : <HamburgerMenu />}
            </button>
            {showMenu && (
              <div className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm flex flex-col items-start bg-white p-10 shadow-lg z-[99999]">
                <button onClick={toggleMenu}>
                  {showMenu ? <CloseMenu /> : <HamburgerMenu />}
                </button>
                <ul className="flex flex-col gap-2 w-full">
                  <li>
                    <NavLink
                      to="/"
                      onClick={toggleMenu}
                      className={getNavLinkClass}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/branches"
                      onClick={toggleMenu}
                      className={getNavLinkClass}
                    >
                      Branches
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      onClick={toggleMenu}
                      className={getNavLinkClass}
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      onClick={toggleMenu}
                      className={getNavLinkClass}
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li>
                    <LanguageSelect />
                  </li>
                </ul>
              </div>
            )}
            <NavLink to="/" className="flex items-center gap-2 ml-5">
              <img src={logo} alt="MaxWay logo" />
              <span className="font-bold">MaxWay</span>
            </NavLink>
          </div>
          <div className="nav-center hidden sm:flex">
            <ul className="flex gap-2">
              <li>
                <NavLink to="/" className={getNavLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/branches" className={getNavLinkClass}>
                  Branches
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={getNavLinkClass}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={getNavLinkClass}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="nav-right flex items-center gap-4">
            <div className="hidden sm:block">
              <LanguageSelect />
            </div>
            <NavLink to="/cart" className="relative flex items-center">
              <Cart />
              {cartCount > 0 && (
                <span className="absolute top-[-10px] right-0 badge bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                  {cartCount}
                </span>
              )}
            </NavLink>
            <button
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

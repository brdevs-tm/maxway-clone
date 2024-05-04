import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { Cart, Login, Tick } from "../assets/img/Icons";
import LanguageSelect from "./Option";

const Header = () => {
  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 border border-gray-100 ${
      isActive ? "bg-gray-100" : "bg-white"
    } rounded-[6px] p-2`;

  const renderTick = ({ isActive }) => isActive && <Tick />;

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
                <NavLink to="/" className={getNavLinkClass}>
                  Bosh sahifa
                  {renderTick({ isActive: window.location.pathname === "/" })}
                </NavLink>
              </li>
              <li>
                <NavLink to="/branches" className={getNavLinkClass}>
                  Filiallar
                  {renderTick({
                    isActive: window.location.pathname === "/branches",
                  })}
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={getNavLinkClass}>
                  Biz haqimizda
                  {renderTick({
                    isActive: window.location.pathname === "/about",
                  })}
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={getNavLinkClass}>
                  Biz bilan bog'lanish
                  {renderTick({
                    isActive: window.location.pathname === "/contact",
                  })}
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="nav-right flex items-center gap-4">
            <div>
              <LanguageSelect />
            </div>
            <button aria-label="Cart">
              <Cart />
            </button>
            <button aria-label="Login">
              <Login />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
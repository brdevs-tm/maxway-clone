import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { Cart, Login, Tick } from "../assets/img/Icons";
import BasicSelect from "./Option";

const Header = () => {
  const getNavLinkClass = ({ isActive }) => {
    return `flex items-center gap-2 border border-gray-100 ${
      isActive ? "bg-gray-100" : "bg-white"
    } rounded-[6px] p-2`;
  };

  return (
    <header>
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
                  <Tick />
                </NavLink>
              </li>
              <li>
                <NavLink to="/branches" className={getNavLinkClass}>
                  Filiallar
                  <Tick />
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={getNavLinkClass}>
                  Biz haqimizda
                  <Tick />
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={getNavLinkClass}>
                  Biz bilan bog'lanish
                  <Tick />
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="nav-right flex items-center gap-4">
            <div>
              <BasicSelect />
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

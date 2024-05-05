import React from "react";
import logo from "../assets/img/logo.png";
import { NavLink } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "../assets/img/Icons";

const Footer = () => {
  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 border border-gray-100 ${
      isActive ? "bg-gray-100" : "bg-white"
    } rounded-[6px] p-2`;

  return (
    <footer className="containerown flex flex-col py-5 gap-6">
      <hr />
      <section className="flex items-center justify-between">
        <img src={logo} alt="MaxWay" />
        <ul className="flex gap-2">
          {["/", "/branches", "/about", "/contact"].map((path, index) => (
            <li key={index}>
              <NavLink to={path} className={getNavLinkClass}>
                {["Home", "Branches", "About us", "Contact"][index]}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
      <hr />
      <section className="flex items-center justify-between">
        <span>© Delever 2020 - 2024 All rights reserved</span>
        <ul className="flex items-center gap-5">
          <li>
            <a href="https://www.instagram.com/maxwayuz/">
              <Instagram />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/maxway.uzb/">
              <Facebook />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@maxway2010">
              <Youtube />
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;

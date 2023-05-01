import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const navLinks = ["Home", "Popular", "Battle"];

const Nav = () => {
  return (
    <div className="container">
      <ul className="nav">
        {navLinks.map((navLink, idx) => {
          return (
            <li key={idx}>
              <NavLink to={navLink !== "Home" ? navLink.toLowerCase() : "/"}>{navLink}</NavLink>
            </li>
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
};

export default Nav;

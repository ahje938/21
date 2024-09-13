// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./../css/NavBar.css";


const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Back to Sections</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

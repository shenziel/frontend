import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">FuelManager</h1>
        <nav className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import routes from "../../routes";

const Header = ({ loggedIn, setLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div className="header-content">
      <h1 className="header-title">FuelManager</h1>
      <div className="header-nav">
        <Link to="/">Home</Link>
        {loggedIn && <Link to={routes.userVehicles}>My Vehicles</Link>}
        {loggedIn && <Link to={routes.manageFuelLogs}>Fuel Logs</Link>}
        {loggedIn && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

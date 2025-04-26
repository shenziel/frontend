import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import routes from "../../routes";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <div className="header-content">
      <h1 className="header-title">FuelManager</h1>
      <div className="header-nav">
        <Link to="/">Home</Link>
        {loggedIn && <Link to={routes.userVehicles}>My Vehicles</Link>}
        {loggedIn && <Link to={routes.manageFuelLogs}>Fuel Logs</Link>}
      </div>
    </div>
  );
};

export default Header;

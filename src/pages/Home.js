import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import "./../styles/Home.css";

const Home = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHasToken(true);
    }
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to FuelManager</h1>
        <p>Your go-to solution for managing fuel consumption and logs.</p>
      </header>

      <main className="home-main">
        {hasToken && (
          <section className="home-intro">
            <h2>Features</h2>
            <ul>
              <li><Link to={routes.manageFuelLogs}>Track fuel consumption</Link></li>
              <li><Link to={routes.userVehicles}>My vehicles</Link></li>
              <li>Manage fuel logs</li>
              <li>View detailed statistics</li>
            </ul>
          </section>
        )}

        {!hasToken && (
          <section className="home-actions">
            <h2>Get Started</h2>
            <p>
              To get started, please <Link to={routes.register}>register</Link> or{" "}
              <Link to={routes.login}>log in</Link>.
            </p>
          </section>
        )}
      </main>

      <footer className="home-footer">
        <p>&copy; 2025 FuelManager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

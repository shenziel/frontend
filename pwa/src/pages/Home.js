import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to FuelManager</h1>
        <p>Your go-to solution for managing fuel consumption and logs.</p>
      </header>

      <main className="home-main">
        <section className="home-intro">
          <h2>Features</h2>
          <ul>
            <li><Link to="/fuel-logs">Track fuel consumption</Link></li>
            <li>Manage fuel logs</li>
            <li>View detailed statistics</li>
          </ul>
        </section>

        <section className="home-actions">
          <h2>Get Started</h2>
          <p>
            To get started, please <Link to="/register">register</Link> or{" "}
            <Link to="/login">log in</Link>.
          </p>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2024 FuelManager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { loginUser } from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./../styles/Login.css";
import Header from "../components/Header";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      const token = data.token;
      const decoded = jwtDecode(token);

      // Save token in local storage or any state management
      localStorage.setItem("token", token);
      alert("Login successful!");

      // Redirect to fuel logs page
      navigate("/home");
    } catch (error) {
      setError("Invalid login credentials");
    }
  };

  return (
    <div>
      <Header />
      <div className="page-container">
        <div className="page-content">
          <h2>Login</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../components/FormInput";
import "./../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://your-api-url/register", {
        username,
        password,
      });
      if (response.status === 200) {
        navigate("/login");
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <FormInput
          label="Username"
          type="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;

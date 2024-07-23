// src/components/Register.js
import React, { useState } from "react";
import api, { getCsrfCookie } from "./Api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await getCsrfCookie(); // Obtenez d'abord le cookie CSRF
      const response = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      const {
        jwt_token,
        access_token,
        access_token_expiration,
        refresh_token,
        refresh_token_expiration,
      } = response.data;

      localStorage.setItem("jwt_token", jwt_token);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem(
        "access_token_expiry",
        Date.now() + access_token_expiration * 60 * 1000
      );
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem(
        "refresh_token_expiry",
        Date.now() + refresh_token_expiration * 60 * 1000
      );

      const decodedToken = jwtDecode(jwt_token);
      const role = decodedToken.role;
      localStorage.setItem("role", role);

      navigate("/documents");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Registration failed", error);
        setErrors({ general: "Registration failed. Please try again." });
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        {errors.name && <div>{errors.name[0]}</div>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <div>{errors.email[0]}</div>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && <div>{errors.password[0]}</div>}
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm Password"
        />
        {errors.password_confirmation && (
          <div>{errors.password_confirmation[0]}</div>
        )}
        <button type="submit">Register</button>
        {errors.general && <div>{errors.general}</div>}
      </form>
    </div>
  );
};

export default Register;

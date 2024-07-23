import React, { useState } from "react";
import api from "./Api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      const {
        jwt_token,
        access_token,
        access_token_expiration,
        refresh_token,
        refresh_token_expiration,
      } = response.data;

      console.log("Login response:", response.data);

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

      console.log("Tokens stored in localStorage");

      setTimeout(() => {
        navigate("/documents");
      }, 100);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Login failed", error);
        setErrors({ general: "Login failed. Please try again." });
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        {errors.general && <div>{errors.general}</div>}
      </form>
    </div>
  );
};

export default Login;

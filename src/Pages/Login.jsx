import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";
import InputField from "../components/InputComponents/InputField"; // Import du nouveau composant

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem(
        "access_token_expiry",
        Date.now() + 24 * 60 * 60 * 1000
      ); // 24 hours

      navigate("/documents");
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
        <InputField
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          error={errors.email ? errors.email[0] : null}
        />
        <InputField
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          error={errors.password ? errors.password[0] : null}
        />
        <button type="submit">Login</button>
        {errors.general && <div>{errors.general}</div>}
      </form>
    </div>
  );
};

export default Login;

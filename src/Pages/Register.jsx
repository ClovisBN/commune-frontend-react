import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";
import InputField from "../components/InputComponents/InputField"; // Import du nouveau composant

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
      const response = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
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
        console.error("Registration failed", error);
        setErrors({ general: "Registration failed. Please try again." });
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <InputField
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          error={errors.name ? errors.name[0] : null}
        />
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
        <InputField
          type="password"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm Password"
          error={
            errors.password_confirmation
              ? errors.password_confirmation[0]
              : null
          }
        />
        <button type="submit">Register</button>
        {errors.general && <div>{errors.general}</div>}
      </form>
    </div>
  );
};

export default Register;

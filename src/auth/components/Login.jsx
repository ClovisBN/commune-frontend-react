// /auth/components/Login.jsx

import React from "react";
import InputField from "../../shared/components/InputComponents/InputField";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";
import { validateLogin } from "../validation/validationRules";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialState = {
    email: "",
    password: "",
  };

  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    initialState,
    validateLogin
  );

  const onSubmit = async () => {
    await login(values.email, values.password, navigate);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          error={errors.email}
        />
        <InputField
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          error={errors.password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

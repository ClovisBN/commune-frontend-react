// /auth/components/Register.jsx
import React from "react";
import InputField from "../../shared/components/InputComponents/InputField";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";
import { validateRegister } from "../validation/validationRules";
import { useAuth } from "../context/AuthContext"; // Importation du AuthContext

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth(); // Utilisation de la fonction register du AuthContext

  const initialState = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    initialState,
    validateRegister
  );

  const onSubmit = async () => {
    try {
      await register(
        {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.passwordConfirmation, // Important pour la validation "confirmed"
        },
        navigate
      );
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          error={errors.name}
        />
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
        <InputField
          type="password"
          name="passwordConfirmation"
          value={values.passwordConfirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
          error={errors.passwordConfirmation}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

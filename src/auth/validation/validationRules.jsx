export const validateLogin = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "L'email est requis";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "L'email est invalide";
  }

  if (!values.password) {
    errors.password = "Le mot de passe est requis";
  } else if (values.password.length < 6) {
    errors.password = "Le mot de passe doit comporter au moins 6 caractères";
  }

  return errors;
};

export const validateRegister = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Le nom est requis";
  }

  if (!values.email) {
    errors.email = "L'email est requis";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "L'email est invalide";
  }

  if (!values.password) {
    errors.password = "Le mot de passe est requis";
  } else if (values.password.length < 6) {
    errors.password = "Le mot de passe doit comporter au moins 6 caractères";
  }

  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = "Les mots de passe ne correspondent pas";
  }

  return errors;
};

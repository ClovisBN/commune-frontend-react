// src/services/errorHandler.js

export const handleError = (error, navigate) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        alert("Votre session a expiré. Veuillez vous reconnecter.");
        localStorage.removeItem("access_token");
        navigate("/login");
        break;
      case 403:
        alert(
          "Vous n'avez pas les autorisations nécessaires pour accéder à cette ressource."
        );
        navigate("/unauthorized");
        break;
      case 404:
        alert("Ressource non trouvée.");
        break;
      default:
        alert("Une erreur est survenue. Veuillez réessayer.");
        break;
    }
  } else if (error.request) {
    alert("Erreur de connexion au serveur. Veuillez vérifier votre connexion.");
  } else {
    alert("Une erreur est survenue : " + error.message);
  }
};

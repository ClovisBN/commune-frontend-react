// src/utils/grievanceUtils.js

// Fonction pour surligner le texte correspondant à la recherche
export const highlightText = (text, search) => {
  if (!search) return text;
  const parts = text.split(new RegExp(`(${search})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      part
    )
  );
};

// Fonction pour filtrer les doléances en fonction du statut et du texte de recherche
export const filterGrievances = (grievances, statusFilter, searchText) => {
  return grievances
    .filter((grievance) =>
      statusFilter === "all" ? true : grievance.status.name === statusFilter
    )
    .filter((grievance) =>
      grievance.title_grievance.toLowerCase().includes(searchText.toLowerCase())
    );
};

// Fonction pour trier les doléances en fonction du champ et de l'ordre de tri
export const sortGrievances = (grievances, sortField, sortOrder) => {
  return grievances.sort((a, b) => {
    if (sortField === "created_at") {
      return sortOrder === "asc"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at);
    } else if (sortField === "title_grievance") {
      return sortOrder === "asc"
        ? a.title_grievance.localeCompare(b.title_grievance)
        : b.title_grievance.localeCompare(a.title_grievance);
    }
    return 0;
  });
};

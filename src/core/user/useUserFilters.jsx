// useUserFilters.js
import { useState, useMemo } from "react";

const useUserFilters = (users) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name"); // 'name' ou 'created_at'
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' ou 'desc'

  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    // Filtrer par recherche
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Trier les utilisateurs
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Pour les dates, convertir en timestamps
      if (sortField === "created_at") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      } else if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });

    return filtered;
  }, [users, searchQuery, sortField, sortOrder]);

  return {
    searchQuery,
    setSearchQuery,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    filteredUsers,
  };
};

export default useUserFilters;

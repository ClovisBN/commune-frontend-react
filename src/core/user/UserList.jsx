// UserList.jsx
import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import useUserFilters from "./useUserFilters";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const {
    searchQuery,
    setSearchQuery,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    filteredUsers,
  } = useUserFilters(users);

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await fetchUsers(navigate);
      setUsers(usersData);
    };

    loadUsers();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      await deleteUser(id, navigate);
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/users/${id}/edit`);
  };

  const handleAddUser = () => {
    navigate("/users/new");
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Inverser l'ordre de tri
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Définir le nouveau champ de tri et ordre ascendant par défaut
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="layout-content-commune">
      <div className="grid-column">
        <h1 className="title-page-commune">Gestion des utilisateurs</h1>
      </div>

      <div className="user-list-and-filter grid-column">
        <div className="user-list-sorting">
          <button onClick={handleAddUser}>Ajouter un utilisateur</button>

          <div className="user-list-sorting-filter-btn">
            <div className="user-list-btn-filter">
              <label>Trier par :</label>
              <button onClick={() => handleSort("name")}>
                Nom{" "}
                {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </button>
              <button onClick={() => handleSort("created_at")}>
                Date de création
                {sortField === "created_at"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </button>
            </div>

            <div className="user-list-sorting-search-bar">
              <input
                type="text"
                placeholder="Rechercher des utilisateurs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>
                <div className="th-user-preview">
                  <svg viewBox="0 0 16 16" className="svg-commune">
                    <path d="M0.637695 13.1914C1.0957 13.1914 1.32812 13 1.47852 12.5215L2.24414 10.3887H6.14746L6.90625 12.5215C7.05664 13 7.2959 13.1914 7.74707 13.1914C8.22559 13.1914 8.5332 12.9043 8.5332 12.4531C8.5332 12.2891 8.50586 12.1523 8.44434 11.9678L5.41602 3.79199C5.2041 3.21777 4.82129 2.9375 4.19922 2.9375C3.60449 2.9375 3.21484 3.21777 3.0166 3.78516L-0.0322266 12.002C-0.09375 12.1797 -0.121094 12.3232 -0.121094 12.4668C-0.121094 12.918 0.166016 13.1914 0.637695 13.1914ZM2.63379 9.12402L4.17871 4.68066H4.21973L5.76465 9.12402H2.63379ZM12.2793 13.2324C13.3115 13.2324 14.2891 12.6787 14.7129 11.8037H14.7402V12.5762C14.7471 12.9863 15.0273 13.2393 15.4238 13.2393C15.834 13.2393 16.1143 12.9795 16.1143 12.5215V8.00977C16.1143 6.49902 14.9658 5.52148 13.1543 5.52148C11.7666 5.52148 10.6592 6.08887 10.2695 6.99121C10.1943 7.15527 10.1533 7.3125 10.1533 7.46289C10.1533 7.81152 10.4062 8.04395 10.7686 8.04395C11.0215 8.04395 11.2129 7.94824 11.3496 7.73633C11.7529 6.99121 12.2861 6.65625 13.1064 6.65625C14.0977 6.65625 14.6992 7.20996 14.6992 8.1123V8.67285L12.5664 8.7959C10.7686 8.8916 9.77734 9.69824 9.77734 11.0107C9.77734 12.3369 10.8096 13.2324 12.2793 13.2324ZM12.6621 12.1387C11.8008 12.1387 11.2129 11.667 11.2129 10.9561C11.2129 10.2725 11.7598 9.82129 12.7578 9.75977L14.6992 9.62988V10.3203C14.6992 11.3457 13.7969 12.1387 12.6621 12.1387Z"></path>
                  </svg>
                  Nom
                </div>
              </th>
              <th>
                <div className="th-user-preview">
                  <svg viewBox="0 0 16 16" className="svg-commune">
                    <path d="M0.870117 8.40625C0.870117 12.8975 3.93262 15.6523 8.19824 15.6523C9.31934 15.6523 10.3242 15.5088 10.9463 15.3037C11.3975 15.1533 11.5547 14.9141 11.5547 14.6338C11.5547 14.3398 11.3428 14.1279 11.0283 14.1279C10.9326 14.1279 10.8164 14.1416 10.6797 14.1689C9.94141 14.3398 9.29883 14.4629 8.42383 14.4629C4.69141 14.4629 2.18262 12.2207 2.18262 8.44727C2.18262 4.81055 4.56836 2.28125 8.12988 2.28125C11.3223 2.28125 13.8926 4.26367 13.8926 7.74316C13.8926 9.69141 13.2363 11.0039 12.1904 11.0039C11.4932 11.0039 11.0967 10.5801 11.0967 9.85547V5.4668C11.0967 5.03613 10.8574 4.77637 10.4473 4.77637C10.0371 4.77637 9.79102 5.03613 9.79102 5.4668V6.12305H9.70215C9.36035 5.28906 8.52637 4.77637 7.52148 4.77637C5.76465 4.77637 4.53418 6.2666 4.53418 8.42676C4.53418 10.6143 5.77148 12.1318 7.57617 12.1318C8.62207 12.1318 9.4082 11.5781 9.79785 10.6279H9.87988C10.0439 11.5645 10.8506 12.1318 11.9443 12.1318C13.9131 12.1318 15.123 10.293 15.123 7.6543C15.123 3.68945 12.2109 1.09863 8.14355 1.09863C3.86426 1.09863 0.870117 4.01758 0.870117 8.40625ZM7.84277 10.9014C6.70801 10.9014 5.99707 9.95117 5.99707 8.44043C5.99707 6.93652 6.71484 5.98633 7.84961 5.98633C9.00488 5.98633 9.73633 6.92285 9.73633 8.41309C9.73633 9.93066 8.99805 10.9014 7.84277 10.9014Z"></path>
                  </svg>
                  Email
                </div>
              </th>
              <th>
                <div className="th-user-preview">
                  <svg viewBox="0 0 16 16" className="svg-commune">
                    <path d="M8 15.126C11.8623 15.126 15.0615 11.9336 15.0615 8.06445C15.0615 4.20215 11.8623 1.00293 7.99316 1.00293C4.13086 1.00293 0.938477 4.20215 0.938477 8.06445C0.938477 11.9336 4.1377 15.126 8 15.126ZM8 10.4229C6.05176 10.4229 4.54785 11.1133 3.83008 11.9131C2.90039 10.9082 2.33301 9.55469 2.33301 8.06445C2.33301 4.91992 4.84863 2.39746 7.99316 2.39746C11.1377 2.39746 13.6738 4.91992 13.6738 8.06445C13.6738 9.55469 13.1064 10.9082 12.1699 11.9131C11.4521 11.1133 9.94824 10.4229 8 10.4229ZM8 9.30176C9.32617 9.30859 10.3516 8.18066 10.3516 6.71094C10.3516 5.33008 9.31934 4.18164 8 4.18164C6.6875 4.18164 5.6416 5.33008 5.64844 6.71094C5.65527 8.18066 6.68066 9.28809 8 9.30176Z"></path>
                  </svg>
                  Rôle
                </div>
              </th>
              <th>
                <div className="th-user-preview">
                  <svg viewBox="0 0 16 16" className="svg-commune">
                    <path d="M3.29688 14.4561H12.7031C14.1797 14.4561 14.9453 13.6904 14.9453 12.2344V3.91504C14.9453 2.45215 14.1797 1.69336 12.7031 1.69336H3.29688C1.82031 1.69336 1.05469 2.45215 1.05469 3.91504V12.2344C1.05469 13.6973 1.82031 14.4561 3.29688 14.4561ZM3.27637 13.1162C2.70898 13.1162 2.39453 12.8154 2.39453 12.2207V5.9043C2.39453 5.30273 2.70898 5.00879 3.27637 5.00879H12.71C13.2842 5.00879 13.6055 5.30273 13.6055 5.9043V12.2207C13.6055 12.8154 13.2842 13.1162 12.71 13.1162H3.27637ZM6.68066 7.38086H7.08398C7.33008 7.38086 7.41211 7.30566 7.41211 7.05957V6.66309C7.41211 6.41699 7.33008 6.3418 7.08398 6.3418H6.68066C6.44141 6.3418 6.35938 6.41699 6.35938 6.66309V7.05957C6.35938 7.30566 6.44141 7.38086 6.68066 7.38086ZM8.92285 7.38086H9.31934C9.56543 7.38086 9.64746 7.30566 9.64746 7.05957V6.66309C9.64746 6.41699 9.56543 6.3418 9.31934 6.3418H8.92285C8.67676 6.3418 8.59473 6.41699 8.59473 6.66309V7.05957C8.59473 7.30566 8.67676 7.38086 8.92285 7.38086ZM11.1582 7.38086H11.5547C11.8008 7.38086 11.8828 7.30566 11.8828 7.05957V6.66309C11.8828 6.41699 11.8008 6.3418 11.5547 6.3418H11.1582C10.9121 6.3418 10.8301 6.41699 10.8301 6.66309V7.05957C10.8301 7.30566 10.9121 7.38086 11.1582 7.38086ZM4.44531 9.58203H4.84863C5.09473 9.58203 5.17676 9.50684 5.17676 9.26074V8.86426C5.17676 8.61816 5.09473 8.54297 4.84863 8.54297H4.44531C4.20605 8.54297 4.12402 8.61816 4.12402 8.86426V9.26074C4.12402 9.50684 4.20605 9.58203 4.44531 9.58203ZM6.68066 9.58203H7.08398C7.33008 9.58203 7.41211 9.50684 7.41211 9.26074V8.86426C7.41211 8.61816 7.33008 8.54297 7.08398 8.54297H6.68066C6.44141 8.54297 6.35938 8.61816 6.35938 8.86426V9.26074C6.35938 9.50684 6.44141 9.58203 6.68066 9.58203ZM8.92285 9.58203H9.31934C9.56543 9.58203 9.64746 9.50684 9.64746 9.26074V8.86426C9.64746 8.61816 9.56543 8.54297 9.31934 8.54297H8.92285C8.67676 8.54297 8.59473 8.61816 8.59473 8.86426V9.26074C8.59473 9.50684 8.67676 9.58203 8.92285 9.58203ZM11.1582 9.58203H11.5547C11.8008 9.58203 11.8828 9.50684 11.8828 9.26074V8.86426C11.8828 8.61816 11.8008 8.54297 11.5547 8.54297H11.1582C10.9121 8.54297 10.8301 8.61816 10.8301 8.86426V9.26074C10.8301 9.50684 10.9121 9.58203 11.1582 9.58203ZM4.44531 11.7832H4.84863C5.09473 11.7832 5.17676 11.708 5.17676 11.4619V11.0654C5.17676 10.8193 5.09473 10.7441 4.84863 10.7441H4.44531C4.20605 10.7441 4.12402 10.8193 4.12402 11.0654V11.4619C4.12402 11.708 4.20605 11.7832 4.44531 11.7832ZM6.68066 11.7832H7.08398C7.33008 11.7832 7.41211 11.708 7.41211 11.4619V11.0654C7.41211 10.8193 7.33008 10.7441 7.08398 10.7441H6.68066C6.44141 10.7441 6.35938 10.8193 6.35938 11.0654V11.4619C6.35938 11.708 6.44141 11.7832 6.68066 11.7832ZM8.92285 11.7832H9.31934C9.56543 11.7832 9.64746 11.708 9.64746 11.4619V11.0654C9.64746 10.8193 9.56543 10.7441 9.31934 10.7441H8.92285C8.67676 10.7441 8.59473 10.8193 8.59473 11.0654V11.4619C8.59473 11.708 8.67676 11.7832 8.92285 11.7832Z"></path>
                  </svg>
                  Date de création
                </div>
              </th>
              <th>
                <div className="th-user-preview">
                  <svg viewBox="0 0 16 16" className="svg-commune">
                    <path d="M8 15.126C11.8623 15.126 15.0615 11.9336 15.0615 8.06445C15.0615 4.20215 11.8623 1.00293 7.99316 1.00293C4.13086 1.00293 0.938477 4.20215 0.938477 8.06445C0.938477 11.9336 4.1377 15.126 8 15.126ZM8 13.7383C4.85547 13.7383 2.33301 11.209 2.33301 8.06445C2.33301 4.91992 4.84863 2.39746 7.99316 2.39746C11.1377 2.39746 13.6738 4.91992 13.6738 8.06445C13.6738 11.209 11.1445 13.7383 8 13.7383ZM7.62402 10.6348C7.79492 10.915 8.20508 10.9287 8.37598 10.6348L10.666 6.73145C10.8574 6.41016 10.7002 6.04102 10.3652 6.04102H5.62793C5.29297 6.04102 5.14941 6.43066 5.32031 6.73145L7.62402 10.6348Z"></path>
                  </svg>
                  Actions
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role.role_name}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>
                  {user.role.role_name !== "admin" ? (
                    <>
                      <button onClick={() => handleEdit(user.id)}>
                        Modifier
                      </button>
                      <button onClick={() => handleDelete(user.id)}>
                        Supprimer
                      </button>
                    </>
                  ) : (
                    <span>Admin</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
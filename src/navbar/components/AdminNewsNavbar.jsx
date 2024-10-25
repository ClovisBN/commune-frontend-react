import React, { useState, useEffect, useRef } from "react";

const AdminNewsNavbar = ({ onFilterChange, onSortChange, onGroupChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeGroup, setActiveGroup] = useState("month");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const filterMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    // Nettoyage de l'écouteur d'événements à la désinstallation du composant
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleFilterMenu = () => {
    setShowFilterMenu((prev) => !prev);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleGroupChangeLocal = (group) => {
    setActiveGroup(group);
    onGroupChange(group);
  };

  const handleSortChangeLocal = (order) => {
    setSortOrder(order);
    onSortChange(order);
  };

  return (
    <div className="admin-news-navbar">
      <button className="button-default menu-button" onClick={toggleFilterMenu}>
        <svg
          viewBox="0 0 13 3"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"></path>
            <path d="M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z"></path>
            <path d="M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z"></path>
          </g>
        </svg>
      </button>
      {showFilterMenu && (
        <div className="filter-menu" ref={filterMenuRef}>
          {/* Section des filtres par type */}
          <div className="filter-section">
            {/* <h4>Filter by Type</h4> */}
            <button onClick={() => handleFilterClick("all")}>
              Both {activeFilter === "all" && <ActiveIcon />}
            </button>
            <button onClick={() => handleFilterClick("document")}>
              Surveys {activeFilter === "document" && <ActiveIcon />}
            </button>
            <button onClick={() => handleFilterClick("article")}>
              Articles {activeFilter === "article" && <ActiveIcon />}
            </button>
          </div>
          <hr />
          {/* Section des filtres par groupe */}
          <div className="filter-section">
            {/* <h4>Group by</h4> */}
            <button onClick={() => handleGroupChangeLocal("day")}>
              Day {activeGroup === "day" && <ActiveIcon />}
            </button>
            <button onClick={() => handleGroupChangeLocal("month")}>
              Month {activeGroup === "month" && <ActiveIcon />}
            </button>
            <button onClick={() => handleGroupChangeLocal("year")}>
              Year {activeGroup === "year" && <ActiveIcon />}
            </button>
          </div>
          <hr />
          {/* Section des filtres par ordre chronologique */}
          <div className="filter-section">
            {/* <h4>Sort Order</h4> */}
            <button onClick={() => handleSortChangeLocal("newest")}>
              Newest to Oldest {sortOrder === "newest" && <ActiveIcon />}
            </button>
            <button onClick={() => handleSortChangeLocal("oldest")}>
              Oldest to Newest {sortOrder === "oldest" && <ActiveIcon />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Composant SVG pour indiquer le filtre actif
const ActiveIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16">
    <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
  </svg>
);

export default AdminNewsNavbar;

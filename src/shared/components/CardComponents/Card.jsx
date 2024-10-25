import React, { useState, useEffect, useRef, useCallback } from "react";

const Card = ({ document: doc, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = useCallback((e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  }, []);

  const closeMenu = useCallback((e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => closeMenu(e);

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeMenu]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleCardClick = () => {
    window.location.href = `/survey/${doc.id}`;
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_API_URL}/storage/${doc.screenshot_path})`,
        }}
      ></div>
      <div className="card-content">
        <div className="card-footer">
          <div className="card-title">{doc.name}</div>
        </div>
        <div className="card-title-date">
          <div className="card-date">{formatDate(doc.created_at)}</div>
          <button
            className="menu-btn"
            onClick={toggleMenu}
            aria-expanded={showMenu}
            aria-haspopup="true"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="5" r="2" fill="#ffffff7e" />
              <circle cx="12" cy="12" r="2" fill="#ffffff7e" />
              <circle cx="12" cy="19" r="2" fill="#ffffff7e" />
            </svg>
          </button>
        </div>
        {showMenu && (
          <div className="menu" ref={menuRef}>
            <ul>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`/documents/${doc.id}`, "_blank");
                }}
              >
                Open in New Tab
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Card);

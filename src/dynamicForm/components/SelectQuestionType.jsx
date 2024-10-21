import React, { useState, useRef, useEffect } from "react";

const SelectQuestionType = ({ currentType, onTypeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownListRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (value) => {
    onTypeChange(value);
    setIsOpen(false);
  };

  // Liste des types de questions disponibles
  const questionTypes = [
    { label: "Multiple Choice", value: "multiple-choice" },
    { label: "Short Answer", value: "short-answer" },
    { label: "Date", value: "date" },
    { label: "Time", value: "time" },
  ];

  // Filtrer les types de questions pour exclure le type actuel
  const filteredQuestionTypes = questionTypes.filter(
    (type) => type.value !== currentType
  );

  // Fermer le menu déroulant si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownListRef.current &&
        !dropdownListRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="cont-select-question-type">
      <button
        className="button-default dropdown-btn"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="dropdown-list"
        ref={buttonRef}
      >
        {currentType.charAt(0).toUpperCase() +
          currentType.slice(1).replace("-", " ")}
      </button>

      <ul
        id="dropdown-list"
        className={`dropdown-list ${isOpen ? "show" : ""}`}
        ref={dropdownListRef}
      >
        {filteredQuestionTypes.map((type) => (
          <li key={type.value}>
            <button
              className="button-default dropdown-item"
              onClick={() => handleOptionClick(type.value)}
            >
              {type.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectQuestionType;

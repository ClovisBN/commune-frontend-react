// SelectComponentType.jsx
import React, { useState, useRef, useEffect } from "react";

const SelectComponentType = ({
  currentType,
  onTypeChange,
  options,
  className,
}) => {
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

  // Filtrer les types pour exclure le type actuel
  const filteredOptions = options.filter((type) => type.value !== currentType);

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

  const currentLabel =
    options.find((type) => type.value === currentType)?.label || currentType;

  return (
    <div className={`cont-select-component-type ${className}`}>
      <button
        className="button-default dropdown-btn"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="dropdown-list"
        ref={buttonRef}
      >
        {currentLabel}
      </button>

      <ul
        id="dropdown-list"
        className={`dropdown-list ${isOpen ? "show" : ""}`}
        ref={dropdownListRef}
      >
        {filteredOptions.map((type) => (
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

export default SelectComponentType;

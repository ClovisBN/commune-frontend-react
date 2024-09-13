import React, { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-btn" onClick={toggleDropdown}>
        Menu
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>
      <div className={`dropdown-list ${isOpen ? "show" : ""}`}>
        <button className="dropdown-item">Item 1</button>
        <button className="dropdown-item">Item 2</button>
        <button className="dropdown-item">Item 3</button>
      </div>
    </div>
  );
};

export default Dropdown;

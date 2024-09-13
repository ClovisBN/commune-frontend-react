import React, { useState, useRef, useEffect } from "react";

const SelectQuestionType = ({ currentType, onTypeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");
  const dropdownListRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (value) => {
    onTypeChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && dropdownListRef.current) {
      setHeight(`${dropdownListRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="dropdown-container">
      <button
        className="dropdown-btn"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="dropdown-list"
      >
        {currentType.charAt(0).toUpperCase() +
          currentType.slice(1).replace("-", " ")}
      </button>

      <ul
        id="dropdown-list"
        className={`dropdown-list ${isOpen ? "show" : ""}`}
        ref={dropdownListRef}
        style={{
          height: height,
        }}
      >
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleOptionClick("multiple-choice")}
          >
            Multiple Choice
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleOptionClick("short-answer")}
          >
            Short Answer
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleOptionClick("date")}
          >
            Date
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleOptionClick("time")}
          >
            Time
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleOptionClick("checkbox")}
          >
            Checkbox
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SelectQuestionType;

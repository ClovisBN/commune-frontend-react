// InputField.js
import React, { useState, useEffect, useCallback, useRef } from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onKeyDown,
  placeholder,
  error,
  rows,
  variant = "default",
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null); // Référence interne

  // Fonction pour ajuster automatiquement la hauteur du textarea
  const adjustTextareaHeight = useCallback((textarea) => {
    if (textarea) {
      textarea.style.height = "auto"; // Réinitialise la hauteur
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajuste la hauteur en fonction du contenu
    }
  }, []);

  useEffect(() => {
    if (type === "textarea" && inputRef.current) {
      adjustTextareaHeight(inputRef.current);
    }
  }, [value, adjustTextareaHeight, type]);

  return (
    <div className={`input-${variant} input-field`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
        </label>
      )}
      <div className={`input-container ${isFocused ? "focused" : ""}`}>
        {type === "textarea" ? (
          <textarea
            ref={inputRef}
            id={name}
            name={name}
            value={value}
            onChange={(e) => {
              onChange(e);
              adjustTextareaHeight(e.target);
            }}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            spellCheck="true"
            rows={rows || 1}
            className="input-element"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoFocus={false}
            disabled={disabled}
            style={{ overflowY: "hidden", resize: "none" }}
          />
        ) : (
          <input
            ref={inputRef}
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="input-element"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoFocus={false}
            disabled={disabled}
          />
        )}
      </div>
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default InputField;

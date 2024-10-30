// InputField.js
import React, { useState, forwardRef, useEffect, useCallback } from "react";

const InputField = forwardRef(
  (
    {
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
      disabled = false, // Ajout du paramètre disabled avec une valeur par défaut false
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Fonction pour ajuster automatiquement la hauteur du textarea
    const adjustTextareaHeight = useCallback((textarea) => {
      if (textarea) {
        textarea.style.height = "auto"; // Réinitialise la hauteur
        textarea.style.height = textarea.scrollHeight + "px"; // Ajuste la hauteur en fonction du contenu
      }
    }, []);

    // Ref callback pour s'assurer que le textarea est ajusté dès qu'il est monté
    const setRef = useCallback(
      (node) => {
        if (ref) {
          if (typeof ref === "function") {
            ref(node);
          } else {
            ref.current = node;
          }
        }
        adjustTextareaHeight(node);
      },
      [ref, adjustTextareaHeight]
    );

    useEffect(() => {
      if (type === "textarea" && ref && ref.current) {
        adjustTextareaHeight(ref.current);
      }
    }, [value, adjustTextareaHeight, type, ref]);

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
              ref={setRef} // Utilise le callback ref pour garantir l'ajustement initial
              id={name}
              name={name}
              value={value}
              onChange={(e) => {
                onChange(e);
                adjustTextareaHeight(e.target); // Ajuste la hauteur sur chaque changement
              }}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              spellCheck="true"
              rows={rows || 1}
              className="input-element"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus={false}
              disabled={disabled} // Applique la propriété disabled
              style={{ overflowY: "hidden", resize: "none" }} // Styles pour un meilleur rendu
            />
          ) : (
            <input
              ref={ref}
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
              disabled={disabled} // Applique la propriété disabled
            />
          )}
        </div>
        {error && <div className="input-error">{error}</div>}
      </div>
    );
  }
);

export default InputField;

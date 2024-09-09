import React, { useState, forwardRef } from "react";

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
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

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
              ref={ref}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              rows={rows || 1}
              className="input-element"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus={false}
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
              autoFocus={false} // Désactive l'autofocus
            />
          )}
        </div>
        {error && <div className="input-error">{error}</div>}
      </div>
    );
  }
);

export default InputField;

import React from "react";

const ButtonDefault = ({ children, variant, ...props }) => {
  const classNames = `button-default ${variant ? `button-${variant}` : ""}`;

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

export default ButtonDefault;

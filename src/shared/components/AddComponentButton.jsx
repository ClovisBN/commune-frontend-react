// shared/components/AddComponentButton.jsx
import React from "react";

const AddComponentButton = ({ onClick }) => {
  return (
    <div className="cont-add-component-btn" onClick={onClick}>
      <button className="button-default add-component-button">
        <svg
          className="add-component-btn"
          viewBox="0 0 16 16"
          //   className="plusMedium"
        >
          <g>
            <path d="M2 8a.77.77 0 01.237-.566.762.762 0 01.566-.244h4.394V2.803a.77.77 0 01.237-.566A.773.773 0 018 2c.225 0 .416.079.573.237a.773.773 0 01.237.566V7.19h4.387c.22 0 .409.081.566.244A.773.773 0 0114 8a.781.781 0 01-.237.573.785.785 0 01-.566.23H8.81v4.401a.764.764 0 01-.237.56A.781.781 0 018 14a.773.773 0 01-.566-.237.764.764 0 01-.237-.559V8.803H2.803a.785.785 0 01-.566-.23A.781.781 0 012 8z"></path>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default AddComponentButton;

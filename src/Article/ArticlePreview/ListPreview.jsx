// ListPreview.jsx
import React from "react";

const ListPreview = ({ content }) => {
  return (
    <div className="cont-component-article-preview">
      <ul className="list-preview">
        {content.map((item, index) => (
          <li className="item-list-preview" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPreview;

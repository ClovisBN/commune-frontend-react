import React, { useState } from "react";

const ListComponent = ({ items, onChange }) => {
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      onChange([...items, newItem]);
      setNewItem("");
    }
  };

  return (
    <div className="create-arcticle-component-list">
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <input
        className=".input-element"
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add list item"
      />
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
};

export default ListComponent;

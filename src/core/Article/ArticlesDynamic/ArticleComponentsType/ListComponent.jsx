import React, { useState } from "react";
import InputField from "../../../../shared/components/InputComponents/InputField";

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
      <InputField
        type="textarea"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add list item"
        variant="variant4 ListComponent"
        disabled={false}
      />
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
};

export default ListComponent;

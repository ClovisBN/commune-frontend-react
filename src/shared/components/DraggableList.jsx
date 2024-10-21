// DraggableList.js
import React, { useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

const DraggableList = ({ items, renderItem, onItemsReordered }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleDragStart = ({ active }) => {
    const activeItem = items.find((item) => item.id === active.id);
    setActiveItem(activeItem);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveItem(null);
    if (active && over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onItemsReordered(newItems);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="draggable-list">
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              index={index}
              renderItem={renderItem}
              item={item}
            />
          ))}
        </div>
      </SortableContext>

      {/* DragOverlay pour éviter la déformation */}
      <DragOverlay>
        {activeItem
          ? renderItem(activeItem, items.indexOf(activeItem), {})
          : null}
      </DragOverlay>
    </DndContext>
  );
};

const SortableItem = ({ id, index, renderItem, item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    width: "100%", // Fixer la largeur de l'élément pendant le drag
    height: "auto",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {renderItem(item, index, {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        isDragging,
      })}
    </div>
  );
};

export default DraggableList;

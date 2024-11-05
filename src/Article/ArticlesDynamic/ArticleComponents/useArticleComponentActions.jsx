// useArticleComponentActions.js
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useArticleComponentActions = (
  components,
  setComponents,
  selectedComponentId,
  setSelectedComponentId
) => {
  const [pendingAction, setPendingAction] = useState(null);

  const addComponentAtIndex = (type, index) => {
    const newComponent = {
      id: uuidv4(),
      type,
      content: type === "list" ? [] : "",
    };

    setComponents((prevComponents) => [
      ...prevComponents.slice(0, index),
      newComponent,
      ...prevComponents.slice(index),
    ]);

    setSelectedComponentId(newComponent.id);
  };

  const handleDeleteComponent = (componentId) => {
    setPendingAction({ type: "delete", componentId });
  };

  const handleDuplicateComponent = (component) => {
    setPendingAction({ type: "duplicate", component });
  };

  const handleChangeComponentType = (componentId, newType) => {
    setComponents((prevComponents) =>
      prevComponents.map((comp) =>
        comp.id === componentId ? { ...comp, type: newType, content: "" } : comp
      )
    );
  };

  useEffect(() => {
    if (pendingAction) {
      if (pendingAction.type === "delete") {
        const { componentId } = pendingAction;

        setComponents((prevComponents) => {
          const idx = prevComponents.findIndex(
            (comp) => comp.id === componentId
          );
          const newComponents = prevComponents.filter(
            (comp) => comp.id !== componentId
          );

          if (selectedComponentId === componentId) {
            let newSelectedComponentIndex = idx > 0 ? idx - 1 : 0;

            if (newComponents.length > 0) {
              setSelectedComponentId(
                newComponents[newSelectedComponentIndex].id
              );
            } else {
              setSelectedComponentId(null);
            }
          }

          return newComponents;
        });
      } else if (pendingAction.type === "duplicate") {
        const { component } = pendingAction;
        const duplicatedComponent = {
          ...component,
          id: uuidv4(),
        };

        setComponents((prevComponents) => {
          const idx = prevComponents.findIndex((c) => c.id === component.id);
          const newComponents = [
            ...prevComponents.slice(0, idx + 1),
            duplicatedComponent,
            ...prevComponents.slice(idx + 1),
          ];

          setSelectedComponentId(duplicatedComponent.id);

          return newComponents;
        });
      }

      setPendingAction(null);
    }
  }, [
    pendingAction,
    setComponents,
    selectedComponentId,
    setSelectedComponentId,
  ]);

  return {
    addComponentAtIndex,
    handleDeleteComponent,
    handleDuplicateComponent,
    handleChangeComponentType,
  };
};

export default useArticleComponentActions;

// AdminArticleBuilder.jsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createArticle } from "../services/articleService";
import HeadingLevel1 from "./components/HeadingLevel1";
import HeadingLevel2 from "./components/HeadingLevel2";
import Paragraph from "./components/Paragraph";
import Quote from "./components/Quote";
import ImageComponent from "./components/ImageComponent";
import ListComponent from "./components/ListComponent";

const componentTypes = {
  heading1: HeadingLevel1,
  heading2: HeadingLevel2,
  paragraph: Paragraph,
  quote: Quote,
  image: ImageComponent,
  list: ListComponent,
};

const AdminArticleBuilder = () => {
  const [components, setComponents] = useState([]);

  const addComponent = (type) => {
    const newComponent = {
      id: uuidv4(),
      type,
      content: type === "list" ? [] : "",
    };
    setComponents([...components, newComponent]);
  };

  const updateComponent = (id, content) => {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, content } : comp))
    );
  };

  const handleSaveArticle = async () => {
    // Structure de l'article à sauvegarder
    const newArticle = {
      title: "Untitled Article",
      description: "Description of the article",
      components: components.map((component) => ({
        id: component.id,
        type: component.type,
        content: component.content,
      })),
    };

    try {
      await createArticle(newArticle);
      setComponents([]); // Réinitialiser les composants après la sauvegarde
      console.log("Article saved successfully");
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  return (
    <div className="admin-article-builder general-cont">
      <div className="layout-content-commune">
        <div className="grid-column">
          <h2>Article Builder</h2>
        </div>
        <div className="grid-column">
          {Object.keys(componentTypes).map((type) => (
            <button
              className="button-default button-variant5"
              key={type}
              onClick={() => addComponent(type)}
            >
              Add {type}
            </button>
          ))}
        </div>

        <div className="grid-column article-components">
          {components.map((component) => {
            const Component = componentTypes[component.type];
            return (
              <div key={component.id} className=" article-component">
                <Component
                  content={component.content}
                  onChange={(content) => updateComponent(component.id, content)}
                />
              </div>
            );
          })}
        </div>

        <div className="grid-column">
          <button
            className="button-default button-variant5"
            onClick={handleSaveArticle}
          >
            Save Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminArticleBuilder;

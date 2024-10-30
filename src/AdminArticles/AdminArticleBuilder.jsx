import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  fetchArticleById,
  createArticle,
  updateArticle,
} from "../services/articleService";
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
  const { id } = useParams(); // Récupère l'ID de l'article depuis l'URL
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);
  const [title, setTitle] = useState("Untitled Article");
  const [description, setDescription] = useState("Description of the article");

  useEffect(() => {
    // Si un ID est présent, charger les données de l'article
    const loadArticle = async () => {
      if (id) {
        try {
          const article = await fetchArticleById(id);
          setTitle(article.title);
          setDescription(article.description);
          setComponents(article.components || []);
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      }
    };

    loadArticle();
  }, [id]);

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
    const newArticle = {
      title,
      description,
      components: components.map((component) => ({
        id: component.id,
        type: component.type,
        content: component.content,
      })),
    };

    try {
      if (id) {
        // Si un ID est présent, mettre à jour l'article
        await updateArticle(id, newArticle);
        console.log("Article updated successfully");
      } else {
        // Sinon, créer un nouvel article
        const createdArticle = await createArticle(newArticle);
        navigate(`/articles/${createdArticle.id}/edit`);
      }
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  return (
    <div className="admin-article-builder general-cont">
      <div className="layout-content-commune">
        <div className="grid-column">
          <h2>Article Builder</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Article Description"
          />
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
              <div key={component.id} className="article-component">
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
            {id ? "Update Article" : "Save Article"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminArticleBuilder;

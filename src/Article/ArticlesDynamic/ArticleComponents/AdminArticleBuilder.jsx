// AdminArticleBuilder.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchArticleById,
  createArticle,
  updateArticle,
} from "../../../services/articleService";
import UnifiedComponent from "../../../shared/components/UnifiedComponent"; // Utiliser le nouveau composant
import useArticleComponentActions from "./useArticleComponentActions";
import DocumentHeaderEdit from "../../../shared/components/DocumentHeaderEdit"; // Import du composant partagé
import DocumentStatusMessage from "../../../shared/components/DocumentStatusMessage"; // Import du nouveau composant
import AddComponentButton from "../../../shared/components/AddComponentButton"; // Import du composant générique

const AdminArticleBuilder = () => {
  const { id } = useParams(); // Récupère l'ID de l'article depuis l'URL
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);
  const [title, setTitle] = useState(""); // Initialisation à une chaîne vide
  const [description, setDescription] = useState(""); // Initialisation à une chaîne vide
  const [status, setStatus] = useState("unpublished"); // Initialisation du statut
  const [hoveredGapIndex, setHoveredGapIndex] = useState(null);
  const [selectedComponentId, setSelectedComponentId] = useState(null);

  const {
    addComponentAtIndex,
    handleDeleteComponent,
    handleDuplicateComponent,
    handleChangeComponentType,
  } = useArticleComponentActions(
    components,
    setComponents,
    selectedComponentId,
    setSelectedComponentId
  );

  useEffect(() => {
    // Si un ID est présent, charger les données de l'article
    const loadArticle = async () => {
      if (id) {
        try {
          const article = await fetchArticleById(id);
          setTitle(article.title || ""); // Assure que la valeur est définie
          setDescription(article.description || ""); // Assure que la valeur est définie
          setComponents(article.components || []);
          setStatus(article.status || "unpublished"); // Assure que le statut est défini
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      }
    };

    loadArticle();
  }, [id]);

  // Effet pour faire défiler jusqu'au composant sélectionné
  useEffect(() => {
    const currentFormRef = document.querySelector(".container-scroll-element");

    const scrollToSelectedComponent = () => {
      const selectedElement = document.getElementById(
        `component-${selectedComponentId}`
      );
      if (selectedElement && currentFormRef) {
        const rect = selectedElement.getBoundingClientRect();
        const containerRect = currentFormRef.getBoundingClientRect();

        if (
          rect.top < containerRect.top ||
          rect.bottom > containerRect.bottom
        ) {
          const offset =
            rect.top < containerRect.top
              ? rect.top - containerRect.top - 44
              : rect.bottom - containerRect.bottom;

          currentFormRef.scrollTo({
            top: currentFormRef.scrollTop + offset,
            behavior: "smooth",
          });
        }
      }
    };

    scrollToSelectedComponent();
  }, [selectedComponentId]);

  const updateComponent = (updatedComponent) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === updatedComponent.id ? updatedComponent : comp
      )
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
      <div className="layout-content-commune container-scroll-element">
        <div className="grid-column cont-form-article">
          <DocumentHeaderEdit
            title={title}
            description={description}
            onTitleChange={(e) => setTitle(e.target.value)}
            onDescriptionChange={(e) => setDescription(e.target.value)}
            titlePlaceholder="Article Title"
            descriptionPlaceholder="Article Description"
            variant="variant2"
            disabled={false}
          />

          {/* Ajout du composant DocumentStatusMessage */}
          <DocumentStatusMessage status={status} documentType="article" />

          {/* Affichage des composants avec gaps */}
          <div className="component-list">
            {/* Gap avant le premier composant */}
            <div
              className="component-gap"
              onMouseEnter={() => setHoveredGapIndex(0)}
              onMouseLeave={() => setHoveredGapIndex(null)}
            >
              <div className="cont-component-gap">
                {hoveredGapIndex === 0 && (
                  <AddComponentButton
                    onClick={() => addComponentAtIndex("paragraph", 0)}
                  />
                )}
              </div>
            </div>

            {components.map((component, index) => (
              <React.Fragment key={component.id}>
                <div
                  id={`component-${component.id}`}
                  className={`component-wrapper ${
                    selectedComponentId === component.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedComponentId(component.id)}
                >
                  <UnifiedComponent
                    item={component}
                    onChange={updateComponent}
                    onDelete={() => handleDeleteComponent(component.id)}
                    onDuplicate={() => handleDuplicateComponent(component)}
                    onTypeChange={(newType) =>
                      handleChangeComponentType(component.id, newType)
                    }
                    isSurvey={false} // Indique qu'il s'agit d'un article
                  />
                </div>
                {/* Gap après chaque composant */}
                <div
                  className="component-gap"
                  onMouseEnter={() => setHoveredGapIndex(index + 1)}
                  onMouseLeave={() => setHoveredGapIndex(null)}
                >
                  <div className="cont-component-gap">
                    {hoveredGapIndex === index + 1 && (
                      <AddComponentButton
                        onClick={() =>
                          addComponentAtIndex("paragraph", index + 1)
                        }
                      />
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
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
    </div>
  );
};

export default AdminArticleBuilder;

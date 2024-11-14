// AdminArticleBuilder.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useArticle from "../../../../hooks/useArticle";
import UnifiedComponent from "../../../../shared/components/document/UnifiedComponent";
import useArticleComponentActions from "./useArticleComponentActions";
import DocumentHeaderEdit from "../../../../shared/components/document/DocumentHeaderEdit";
import DocumentStatusMessage from "../../../../shared/components/document/DocumentStatusMessage";
import AddComponentButton from "../../../../shared/components/document/AddComponentButton";

const AdminArticleBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    article,
    setArticle,
    selectedComponentId,
    setSelectedComponentId,
    updateComponents,
  } = useArticle(id, navigate);

  const [hoveredGapIndex, setHoveredGapIndex] = useState(null);

  const {
    addComponentAtIndex,
    handleDeleteComponent,
    handleDuplicateComponent,
    handleChangeComponentType,
  } = useArticleComponentActions(
    article?.content_article || [],
    updateComponents,
    selectedComponentId,
    setSelectedComponentId
  );

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

  if (!article) {
    return <div>Loading...</div>;
  }

  const updateComponent = (updatedComponent) => {
    updateComponents((prevComponents) =>
      prevComponents.map((comp) =>
        comp.id === updatedComponent.id ? updatedComponent : comp
      )
    );
  };

  return (
    <div className="admin-article-builder general-cont">
      <div className="layout-content-commune container-scroll-element">
        <div className="grid-column cont-form-article">
          <DocumentHeaderEdit
            title={article.title_article}
            description={article.description_article}
            onTitleChange={(e) =>
              setArticle({ ...article, title_article: e.target.value })
            }
            onDescriptionChange={(e) =>
              setArticle({ ...article, description_article: e.target.value })
            }
            titlePlaceholder="Article Title"
            descriptionPlaceholder="Article Description"
            variant="variant2"
            disabled={false}
          />

          {/* Ajout du composant DocumentStatusMessage */}
          <DocumentStatusMessage
            status={article.status_id === 1 ? "unpublished" : "published"}
            documentType="article"
          />

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

            {article.content_article.map((component, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default AdminArticleBuilder;

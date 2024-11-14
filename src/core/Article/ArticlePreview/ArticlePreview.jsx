// ArticlePreview.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../../../services/articleService";
import DocumentHeaderPreview from "../../../shared/components/document/DocumentHeaderPreview";
import ParagraphPreview from "./ParagraphPreview";
import Heading1Preview from "./Heading1Preview";
import Heading2Preview from "./Heading2Preview";
import QuotePreview from "./QuotePreview";
import ImagePreview from "./ImagePreview";
import ListPreview from "./ListPreview";

const ArticlePreview = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!article) return <div>Article not found</div>;

  return (
    <div className="layout-content-commune container-scroll-element">
      <div className="grid-column gape24">
        <DocumentHeaderPreview
          title={article.title_article}
          description={article.description_article}
        />

        {article.content_article.map((component) => {
          switch (component.type) {
            case "paragraph":
              return (
                <ParagraphPreview
                  key={component.id}
                  content={component.content}
                />
              );
            case "heading1":
              return (
                <Heading1Preview
                  key={component.id}
                  content={component.content}
                />
              );
            case "heading2":
              return (
                <Heading2Preview
                  key={component.id}
                  content={component.content}
                />
              );
            case "quote":
              return (
                <QuotePreview key={component.id} content={component.content} />
              );
            case "image":
              return (
                <ImagePreview key={component.id} content={component.content} />
              );
            case "list":
              return (
                <ListPreview key={component.id} content={component.content} />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default ArticlePreview;

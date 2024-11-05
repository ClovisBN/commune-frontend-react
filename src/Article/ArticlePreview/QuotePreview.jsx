// QuotePreview.jsx
import React from "react";

const QuotePreview = ({ content }) => {
  return (
    <div className="cont-component-article-preview">
      <div className="cont-quote-preview">
        <div className="quote-spacer"></div>
        <blockquote className="quote-preview">{content}</blockquote>
      </div>
    </div>
  );
};

export default QuotePreview;

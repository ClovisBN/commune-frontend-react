import React from "react";

const TimelineCardItem = ({ item }) => {
  const date = new Date(item.created_at);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <div className="timeline-item-content">
      <div className="date">
        <span className="month">{month}</span>
        <span className="day">{day}</span>
        <span className="year">{year}</span>
      </div>
      <div className="gap-card-spacer"></div>
      <div className="content">
        <h2>{item.title_article || item.title_survey}</h2>
        <p>{item.description_article || item.description_survey}</p>
      </div>
      <div className="tag-cont">
        <span className="tag">
          {item.type === "article" ? "Article" : "Sondage"}
        </span>
      </div>
    </div>
  );
};

export default TimelineCardItem;

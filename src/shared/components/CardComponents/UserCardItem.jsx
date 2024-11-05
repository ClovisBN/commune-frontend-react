// shared/CardComponents/UserCardItem.jsx
import React from "react";

const UserCardItem = ({ item, onView }) => {
  // Fonction pour retourner le statut lisible
  const getStatusLabel = (statusId) => {
    if (statusId === 1) return "Non publié";
    if (statusId === 2) return "Publié";
    return "Indéfini";
  };

  return (
    <div className="user-card-item" onClick={() => onView(item.id)}>
      <div className="user-header-card-item">
        <div className="card-part-top">
          <svg viewBox="0 0 16 16">
            <path d="M4.35986 15.3999C2.89697 15.3999 2.13818 14.6343 2.13818 13.1577V2.84229C2.13818 1.37256 2.89697 0.600098 4.35986 0.600098H7.65479C8.50928 0.600098 8.98096 0.736816 9.55518 1.31787L13.144 4.96826C13.7388 5.56982 13.8618 6.00732 13.8618 6.95752V13.1577C13.8618 14.6274 13.103 15.3999 11.6401 15.3999H4.35986ZM4.46924 14.0601H11.5239C12.187 14.0601 12.522 13.7114 12.522 13.0757V7.13525H8.8374C7.8667 7.13525 7.38135 6.66357 7.38135 5.68604V1.93994H4.46924C3.80615 1.93994 3.47803 2.29541 3.47803 2.92432V13.0757C3.47803 13.7114 3.80615 14.0601 4.46924 14.0601ZM8.96045 5.95947H12.3374L8.56396 2.12451V5.55615C8.56396 5.83643 8.68018 5.95947 8.96045 5.95947ZM10.437 8.93311C10.6831 8.93311 10.8677 9.12451 10.8677 9.36377C10.8677 9.60986 10.6831 9.80127 10.437 9.80127H5.43311C5.17334 9.80127 4.98877 9.60986 4.98877 9.36377C4.98877 9.12451 5.17334 8.93311 5.43311 8.93311H10.437ZM10.437 11.23C10.6831 11.23 10.8677 11.4214 10.8677 11.6675C10.8677 11.9067 10.6831 12.0913 10.437 12.0913H5.43311C5.17334 12.0913 4.98877 11.9067 4.98877 11.6675C4.98877 11.4214 5.17334 11.23 5.43311 11.23H10.437Z"></path>
          </svg>
        </div>
        <div className="card-part-bottom">
          <h3 className="card-documents-1-title">{item.name || item.title}</h3>
          <p className="card-documents-1-statu">
            {getStatusLabel(item.status_id)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCardItem;

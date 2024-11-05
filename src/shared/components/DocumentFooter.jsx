// DocumentFooter.jsx
import React from "react";
import ButtonDefault from "./ButtonComponents/ButtonDefault";
import { HiMiniDocumentDuplicate } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { IoAlertCircle } from "react-icons/io5";
import SelectComponentType from "./SelectComponentType";

const DocumentFooter = ({
  onDelete,
  onDuplicate,
  onToggleRequired,
  currentType,
  onTypeChange,
  showRequiredToggle = false,
  selectOptions,
  selectClassName = "",
}) => {
  return (
    <div className="document-footer">
      <SelectComponentType
        currentType={currentType}
        onTypeChange={onTypeChange}
        options={selectOptions}
        className={selectClassName}
      />

      <div className="spacer"></div>

      {showRequiredToggle && (
        <>
          <ButtonDefault
            onClick={onToggleRequired}
            variant="variant5 btn-required"
            title="Toggle Required"
          >
            <div>
              <IoAlertCircle style={{ width: "16px", height: "16px" }} />
              <span>Requis</span>
            </div>
          </ButtonDefault>
          <span className="separator-vertical"></span>
        </>
      )}

      <ButtonDefault
        onClick={onDuplicate}
        variant="variant5 btn-duplicate"
        title="Dupliquer"
      >
        <div>
          <HiMiniDocumentDuplicate style={{ width: "16px", height: "16px" }} />
          <span>Dupliquer</span>
        </div>
      </ButtonDefault>

      <ButtonDefault
        onClick={onDelete}
        variant="variant5 btn-delete"
        title="Supprimer"
      >
        <div>
          <MdDelete style={{ width: "16px", height: "16px" }} />
          <span>Supprimer</span>
        </div>
      </ButtonDefault>
    </div>
  );
};

export default DocumentFooter;

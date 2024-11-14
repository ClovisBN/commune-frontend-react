// SurveyPreviewNavbar.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const SurveyPreviewNavbar = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = () => {
    navigate(`/admin/survey/${id}/edit`);
  };

  return (
    <div className="survey-actions">
      <button onClick={handleEdit} className="button-default edit-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M3.926 13.307H14.11c.183 0 .34-.066.472-.199a.644.644 0 00.198-.471.652.652 0 00-.198-.479.644.644 0 00-.472-.198H5.272l-1.346 1.347zm-.704-.636l7.683-7.684-1.312-1.319-7.69 7.684-.67 1.606c-.037.1-.017.191.06.273.083.082.174.105.274.069l1.655-.63zm8.34-8.326l.738-.732c.182-.187.278-.376.287-.567.009-.192-.068-.374-.232-.547l-.267-.267c-.169-.168-.351-.246-.547-.232-.196.014-.385.11-.567.287l-.739.732 1.327 1.326z"></path>
        </svg>
        Edition
      </button>
    </div>
  );
};

export default SurveyPreviewNavbar;

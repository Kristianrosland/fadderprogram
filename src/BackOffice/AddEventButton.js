import React from "react";
import "./eventManager.scss";

const AddEventButton = ({ handleClick }) => {
  return (
    <div className="add-event-button" onClick={handleClick}>
      <p>+</p>
    </div>
  );
};

export default AddEventButton;

import React from "react";
import "./ErrorHandler.css";

const ErrorHandler = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <p>{error}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default ErrorHandler;
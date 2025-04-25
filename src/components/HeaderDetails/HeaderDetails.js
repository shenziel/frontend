import React from "react";
import "./HeaderDetails.css";

const HeaderDetails = ({ handleGoBack }) => {
    return (
    <div className="header">
        <button onClick={handleGoBack} className="back-button">
        ← Back
        </button>
        <button className="right-button" onClick={() => alert("Right Button Clicked!")}>
        Add Vehicle
        </button>
    </div>)
};

export default HeaderDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllVehiclesExpenses } from "../services/api";
import ErrorHandler from "../components/ErrorHandler/ErrorHandler";
import "./FuelLogs.css";

const FuelLogs = () => {
  const [vehiclesWithLogs, setVehiclesWithLogs] = useState([]);
  const [error, setError] = useState(null);
  const [closePopup, setClosePopup] = useState('#');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllLogs = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getAllVehiclesExpenses(token);
        setVehiclesWithLogs(data);
      } catch (error) {
        if (error.response?.status === 401) {
          const errorMessage = error.response?.data?.error;
          console.error(errorMessage);
          setError(errorMessage);
          setClosePopup('/home')
          localStorage.removeItem("token");
        } else {
          const errorMessage =
            error.response?.data?.error || "Failed to fetch data. Please try again later.";
          console.error("Error fetching fuel logs:", errorMessage);
          setError(errorMessage);
        }
      }
    };

    fetchAllLogs();
  }, []);

  const closeErrorPopup = () => {
    setError(null);
    navigate(closePopup);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={handleGoBack} className="back-button">
        ← Back
      </button>
      <h2>Fuel Logs</h2>
      <ErrorHandler error={error} onClose={closeErrorPopup} />
      {vehiclesWithLogs.map((vehicle) => (
        <div key={vehicle.licensePlate} className="vehicle-section">
          <h3>
            {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
          </h3>
          <div className="table">
            <div className="table-header">
              <div className="table-row">
                <div className="table-cell">Date</div>
                <div className="table-cell">Distance (km)</div>
                <div className="table-cell">Fuel (L)</div>
                <div className="table-cell">Price per Liter</div>
                <div className="table-cell">Total Cost</div>
                <div className="table-cell">Full Tank</div>
              </div>
            </div>
            <div className="table-body">
              {vehicle.expenses.map((expense, index) => (
                <div className="table-row" key={index}>
                  <div className="table-cell">{expense.date}</div>
                  <div className="table-cell">{expense.distance}</div>
                  <div className="table-cell">{expense.amount}</div>
                  <div className="table-cell">{expense.pricePerLiter}</div>
                  <div className="table-cell">{expense.totalCost}</div>
                  <div className="table-cell">{expense.fullTank ? "Yes" : "No"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FuelLogs;

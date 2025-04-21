import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFuelLogs, getVehicleDetails } from "../services/api";
import "./FuelLogs.css";

const FuelLogs = () => {
  const { licensePlate } = useParams();
  const [logs, setLogs] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem("token");
      try {
        const [logsData, vehicleData] = await Promise.all([
          getFuelLogs(token),
          getVehicleDetails(token, licensePlate),
        ]);
        setLogs(logsData);
        setVehicle(vehicleData);
      } catch (error) {
        // Extract error message from the response
        if (error.response?.status === 401) {
          const errorMessage = error.response?.data?.error;
          console.error(errorMessage);
          navigate("/home");
        } else {
          const errorMessage =
            error.response?.data?.error || "Failed to fetch data. Please try again later.";
          console.error("Error fetching fuel logs:", errorMessage);
          setError(errorMessage);
        }
      }
    };
    fetchLogs();
  }, [licensePlate, navigate]);

  const closeErrorPopup = () => {
    setError(null);
  };

  return (
    <div>
      <h2>Fuel Logs</h2>
      {error && (
        <div className="error-popup">
          <div className="error-popup-content">
            <p>{error}</p>
            <button onClick={closeErrorPopup} className="close-button">Close</button>
          </div>
        </div>
      )}
      {vehicle && (
        <div className="vehicle-details">
          <p><strong>Vehicle:</strong> {vehicle.make} {vehicle.model}</p>
          <p><strong>License Plate:</strong> {vehicle.licensePlate}</p>
        </div>
      )}
      <div className="table">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell">Date</div>
            <div className="table-cell">Distance (km)</div>
            <div className="table-cell">Fuel (L)</div>
            <div className="table-cell">Price per Liter</div>
            <div className="table-cell">Total Cost</div>
            <div className="table-cell">Vehicle Km</div>
            <div className="table-cell">Full Tank</div>
          </div>
        </div>
        <div className="table-body">
          {logs.map((log) => (
            <div className="table-row" key={log.id}>
              <div className="table-cell">{log.date}</div>
              <div className="table-cell">{log.distance}</div>
              <div className="table-cell">{log.amount}</div>
              <div className="table-cell">{log.pricePerLiter}</div>
              <div className="table-cell">{log.totalCost}</div>
              <div className="table-cell">{vehicle.kilometrage}</div>
              <div className="table-cell">
                {log.fullTank ? "Yes" : "No"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FuelLogs;

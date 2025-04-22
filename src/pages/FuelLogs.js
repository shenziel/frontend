import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFuelLogs, getVehicleDetails } from "../services/api";
import ErrorHandler from "../components/ErrorHandler/ErrorHandler";
import "./FuelLogs.css";

const FuelLogs = () => {
  const { licensePlate } = useParams();
  const [logs, setLogs] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);
  const [newRow, setNewRow] = useState({
    date: "",
    distance: "",
    amount: "",
    pricePerLiter: "",
    totalCost: "",
    fullTank: false,
  });
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
        if (error.response?.status === 401) {
          const errorMessage = error.response?.data?.error;
          console.error(errorMessage);
          setError(errorMessage);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRow((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddRow = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://your-api-url.com/fuel-logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRow),
      });
      if (!response.ok) {
        throw new Error("Failed to add new row");
      }
      const addedRow = await response.json();
      setLogs((prevLogs) => [...prevLogs, addedRow]);
      setNewRow({
        date: "",
        distance: "",
        amount: "",
        pricePerLiter: "",
        totalCost: "",
        fullTank: false,
      });
    } catch (error) {
      console.error("Error adding new row:", error);
      setError("Failed to add new row. Please try again.");
    }
  };

  const closeErrorPopup = () => {
    setError(null);
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <div>
      <h2>Fuel Logs</h2>
      <ErrorHandler error={error} onClose={closeErrorPopup} />
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
            <div className="table-cell">Actions</div>
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
              <div className="table-cell">{log.fullTank ? "Yes" : "No"}</div>
            </div>
          ))}
        </div>
        <div className="table-footer">
          <div className="table-row">
            <div className="table-cell">
              <input
                type="date"
                name="date"
                value={newRow.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="table-cell">
              <input
                type="number"
                name="distance"
                value={newRow.distance}
                onChange={handleInputChange}
              />
            </div>
            <div className="table-cell">
              <input
                type="number"
                name="amount"
                value={newRow.amount}
                onChange={handleInputChange}
              />
            </div>
            <div className="table-cell">
              <input
                type="number"
                name="pricePerLiter"
                value={newRow.pricePerLiter}
                onChange={handleInputChange}
              />
            </div>
            <div className="table-cell">
              <input
                type="number"
                name="totalCost"
                value={newRow.totalCost}
                onChange={handleInputChange}
              />
            </div>
            <div className="table-cell">
              <input
                type="checkbox"
                name="fullTank"
                checked={newRow.fullTank}
                onChange={handleInputChange}
              />
            </div>
            <div className="table-cell">
              <button onClick={handleAddRow}>Add Row</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelLogs;

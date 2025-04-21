import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllVehicles } from "../services/api"; // Assuming this API fetches all vehicles
import "./UserVehicles.css";

const UserVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getAllVehicles(token); // Fetch all vehicles
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="vehicle-details-container">
      <h2>Vehicle List</h2>
      <div className="table">
        <div className="table-header">
          <div className="table-row">
            <div className="table-cell">License Plate</div>
            <div className="table-cell">Make</div>
            <div className="table-cell">Model</div>
            <div className="table-cell">Year</div>
          </div>
        </div>
        <div className="table-body">
          {vehicles.map((vehicle) => (
            <div className="table-row" key={vehicle.licensePlate}>
              <div className="table-cell">
                <Link to={`/vehicle-details/${vehicle.licensePlate}`}>
                  {vehicle.licensePlate}
                </Link>
              </div>
              <div className="table-cell">{vehicle.make}</div>
              <div className="table-cell">{vehicle.model}</div>
              <div className="table-cell">{vehicle.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserVehicles;
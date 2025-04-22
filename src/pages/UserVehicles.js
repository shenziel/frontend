import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllVehicles } from "../services/api";
import ErrorHandler from "../components/ErrorHandler/ErrorHandler";
import "./UserVehicles.css";

const UserVehicles = () => {
  const [vehicles, setVehicles] = useState([]);  
  const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getAllVehicles(token);
        setVehicles(data);
      } catch (error) {
        if (error.response?.status === 401) {
          const errorMessage = error.response?.data?.error;
          console.error(errorMessage);
          //navigate("/home");
        } else {
          const errorMessage =
            error.response?.data?.error || "Failed to fetch data. Please try again later.";
          console.error("Error fetching fuel logs:", errorMessage);
          setError(errorMessage);
        }
      }
    };
    fetchVehicles();
  }, []);

  const closeErrorPopup = () => {
    setError(null);
    navigate("/home");
  };

  return (
    <div className="vehicle-details-container">
      <h2>Vehicle List</h2>
      <ErrorHandler error={error} onClose={closeErrorPopup} />
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
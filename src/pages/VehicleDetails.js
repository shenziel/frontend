import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVehicleDetails } from "../services/api";
import ErrorHandler from "../components/ErrorHandler/ErrorHandler";
import "./VehicleDetails.css";

const VehicleDetails = () => {
  const { licensePlate } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getVehicleDetails(token, licensePlate);
        setVehicle(data);
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

    fetchVehicleDetails();
  }, [licensePlate]);

  if (!vehicle) {
    return <p>Loading vehicle details...</p>;
  }

  const closeErrorPopup = () => {
    setError(null);
    navigate("/home");
  };

  return (
    <div className="vehicle-details-container">
      <h2>Vehicle Details</h2>
      <ErrorHandler error={error} onClose={closeErrorPopup} />
      <p><strong>License Plate:</strong> {vehicle.licensePlate}</p>
      <p><strong>Make:</strong> {vehicle.make}</p>
      <p><strong>Model:</strong> {vehicle.model}</p>
      <p><strong>Year:</strong> {vehicle.year}</p>
      <p><strong>Kilometrage:</strong> {vehicle.kilometrage}</p>
      <p><strong>Owner:</strong> {vehicle.userName}</p>
      <button onClick={() => navigate(`/fuel-logs/${vehicle.licensePlate}`)} className="navigate-button">
        Go to Fuel Logs
      </button>
    </div>
  );
};

export default VehicleDetails;
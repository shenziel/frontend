import React, { useEffect, useState } from "react";
import { getFuelLogs } from "../services/api";

const FuelLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await getFuelLogs(token);
        setLogs(data);
      } catch (error) {
        console.error("Error fetching fuel logs:", error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Fuel Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            Date: {log.date} | Distance: {log.distance} km | Fuel: {log.amount}{" "}
            L
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FuelLogs;

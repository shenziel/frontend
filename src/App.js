import React from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import FuelLogs from "./pages/FuelLogs";
import Register from "./pages/Register";
import UserVehicles from "./pages/UserVehicles";
import VehicleDetails from "./pages/VehicleDetails";
import Home from "./pages/Home";

function AppRoutes() {
  const routes = useRoutes([
    { path: "/", element: <Navigate to="/home" replace /> },
    { path: "/login", element: <Login /> },
    { path: "/home", element: <Home /> },
    { path: "/register", element: <Register /> },
    { path: "/fuel-logs/:licensePlate", element: <FuelLogs /> },
    { path: "/my-vehicles", element: <UserVehicles /> },
    { path: "/vehicle-details/:licensePlate", element: <VehicleDetails /> },
  ]);

  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

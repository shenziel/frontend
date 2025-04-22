import React from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import FuelLogs from "./pages/FuelLogs";
import Register from "./pages/Register";
import UserVehicles from "./pages/UserVehicles";
import VehicleDetails from "./pages/VehicleDetails";
import Home from "./pages/Home";
import routes from "./routes";

function AppRoutes() {
  const appRoutes = useRoutes([
    { path: "/", element: <Navigate to={routes.home} replace /> },
    { path: routes.login, element: <Login /> },
    { path: routes.home, element: <Home /> },
    { path: routes.register, element: <Register /> },
    { path: routes.fuelLogs, element: <FuelLogs /> },
    { path: routes.userVehicles, element: <UserVehicles /> },
    { path: routes.vehicleDetails, element: <VehicleDetails /> },
    { path: routes.manageFuelLogs, element: <FuelLogs /> },
    { path: routes.statistics, element: <FuelLogs /> },
  ]);

  return appRoutes;
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

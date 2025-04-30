import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import FuelLogs from "./pages/FuelLogs";
import Register from "./pages/Register";
import UserVehicles from "./pages/UserVehicles";
import VehicleDetails from "./pages/VehicleDetails";
import FuelLogsManager from "./pages/FuelLogsManager";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import "./App.css";
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
    { path: routes.manageFuelLogs, element: <FuelLogsManager /> },
    { path: routes.statistics, element: <FuelLogs /> },
  ]);

  return appRoutes;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;

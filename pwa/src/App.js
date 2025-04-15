import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import FuelLogs from "./pages/FuelLogs";
import Register from "./pages/Register";
import Home from "./pages/Home";

function AppRoutes() {
  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/home", element: <Home /> },
    { path: "/register", element: <Register /> },
    { path: "/fuel-logs", element: <FuelLogs /> },
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

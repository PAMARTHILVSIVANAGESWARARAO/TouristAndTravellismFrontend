import React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from "./Hero/Home";

import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PlanTrip from "./pages/PlanTrip.jsx";
import TripsList from "./pages/TripsList.jsx";
import TripDetails from "./pages/TripDetails.jsx";
import Photos from "./pages/Photos.jsx";
import ProtectedRoute from "./utils/protectedRoute.jsx";

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/plan"
        element={
          <ProtectedRoute>
            <PlanTrip />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trips"
        element={
          <ProtectedRoute>
            <TripsList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trip/:id"
        element={
          <ProtectedRoute>
            <TripDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/photos"
        element={
          <ProtectedRoute>
            <Photos />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

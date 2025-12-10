import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Hero/Home";
import About from "./Hero/About";

import Login from "./Components/Login";
import Register from "./Components/Register";

import Dashboard from "./pages/Dashboard";
import PlanTrip from "./pages/PlanTrip";
import TripsList from "./pages/TripsList";
import TripDetails from "./pages/TripDetails";
import Photos from "./pages/Photos";

import ProtectedRoute from "./utils/protectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plan-trip"
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
          path="/trips/:id"
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
    </Router>
  );
}

export default App;

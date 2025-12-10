import React, { useEffect, useState } from "react";
import { getProfile } from "../api/authAPI";
import { removeToken } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUserProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res);
    } catch (error) {
      console.log("Failed to load user profile");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">

      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700">
          Dashboard
        </h1>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Welcome, {user?.name || "Traveler"} 👋
        </h2>
        <p className="text-gray-700">
          Start planning your next adventure!
        </p>
      </div>

      {/* Navigation Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <Link
          to="/plan-trip"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center"
        >
          <i className="bi bi-map text-green-600 text-5xl mb-3"></i>
          <h3 className="text-xl font-semibold">Plan a Trip</h3>
        </Link>

        <Link
          to="/trips"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center"
        >
          <i className="bi bi-globe text-green-600 text-5xl mb-3"></i>
          <h3 className="text-xl font-semibold">My Trips</h3>
        </Link>

        <Link
          to="/photos"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center"
        >
          <i className="bi bi-images text-green-600 text-5xl mb-3"></i>
          <h3 className="text-xl font-semibold">My Photos</h3>
        </Link>

      </div>
    </div>
  );
}

export default Dashboard;

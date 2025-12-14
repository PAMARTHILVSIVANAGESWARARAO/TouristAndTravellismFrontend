import React, { useEffect, useState } from "react";
import { getTripById } from "../api/tripAPI";
import { useParams, Link, useNavigate } from "react-router-dom";

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTrip = async () => {
    try {
      setLoading(true);
      const res = await getTripById(id);
      setTrip(res.data);
      setMsg("");
    } catch (err) {
      setMsg("Failed to load trip details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Trip not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-lg border-b-4 border-green-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="bi bi-airplane-fill text-white text-2xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Trippy
                </h1>
                <p className="text-xs text-gray-500 font-medium">Travel Planner</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/trips")}
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                <i className="bi bi-arrow-left-circle-fill text-lg"></i>
                <span className="hidden sm:inline">Go Back</span>
              </button>
              <Link
                to="/photos"
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                <i className="bi bi-camera-fill text-lg"></i>
                <span className="hidden sm:inline">Photos</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <i className="bi bi-geo-alt-fill text-black text-3xl"></i>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg">
                  {trip.destination}
                </h1>
                <p className="text-green-50 text-lg font-medium mt-1">
                  <i className="bi bi-pin-map-fill mr-2"></i>
                  From: {trip.startPlace}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className={`px-4 py-2 text-sm font-bold rounded-full shadow-lg ${
                trip.status === "completed"
                  ? "bg-white text-green-600"
                  : "bg-amber-100 text-amber-700"
              }`}>
                <i className={`bi ${
                  trip.status === "completed"
                    ? "bi-check-circle-fill"
                    : "bi-clock-fill"
                } mr-2`}></i>
                {trip.status === "completed" ? "Completed" : "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {msg && (
          <div className="mb-6 p-4 rounded-2xl shadow-lg flex items-center gap-3 bg-red-50 border-2 border-red-300">
            <i className="bi bi-exclamation-circle-fill text-red-500 text-2xl"></i>
            <p className="font-semibold text-red-700">{msg}</p>
          </div>
        )}

        {/* Budget Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6 border-2 border-green-200 hover:border-green-400 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="bi bi-currency-dollar text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Budget
            </h2>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-4 border-2 border-green-200">
            <p className="text-xl sm:text-2xl font-bold text-gray-800">
              Total: <span className="text-green-600">{trip.budget.estimatedTotal} {trip.budget.currency}</span>
            </p>
          </div>

          <h3 className="font-bold text-lg text-gray-700 mb-3">Breakdown:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(trip.budget.breakdown).map(([key, val]) => (
              <div key={key} className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-green-300 transition-all">
                <p className="text-gray-600 text-sm font-medium capitalize">{key}</p>
                <p className="text-xl font-bold text-gray-800">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Flights Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6 border-2 border-blue-200 hover:border-blue-400 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <i className="bi bi-airplane-engines-fill text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Flights
            </h2>
          </div>
          
          <div className="space-y-4">
            {trip.flights.map((f, idx) => (
              <div key={idx} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <i className="bi bi-airplane-fill text-blue-600 text-xl"></i>
                    <p className="font-bold text-gray-800 text-lg">{f.flightName}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                      {f.price} {f.currency}
                    </span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
                      <i className="bi bi-clock-fill mr-1"></i>
                      {f.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locations Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6 border-2 border-purple-200 hover:border-purple-400 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <i className="bi bi-pin-map-fill text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Locations
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trip.locations.map((loc, idx) => (
              <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <i className="bi bi-geo-alt-fill text-purple-600 text-xl mt-1"></i>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{loc.name}</h3>
                    <p className="text-gray-600">{loc.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-orange-200 hover:border-orange-400 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <i className="bi bi-calendar-check-fill text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Itinerary
            </h2>
          </div>

          <div className="space-y-4">
            {trip.itinerary.map((day, idx) => (
              <div key={idx} className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold">{day.day}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Day {day.day}</h3>
                </div>
                <ul className="ml-13 space-y-2">
                  {day.activities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="bi bi-check-circle-fill text-orange-500 mt-1"></i>
                      <span className="text-gray-700">{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/trips")}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-gray-700 hover:to-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <i className="bi bi-arrow-left-circle-fill text-2xl"></i>
            Back to Trips
          </button>
          <Link
            to="/photos"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <i className="bi bi-camera-fill text-2xl"></i>
            Manage Photos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;
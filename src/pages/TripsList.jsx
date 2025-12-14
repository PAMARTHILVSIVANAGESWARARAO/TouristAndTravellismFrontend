import React, { useEffect, useState } from "react";
import { getTrips, updateTripStatus, deleteTrip } from "../api/tripAPI";
import { Link } from "react-router-dom";
import "./TripList.css";

function TripsList() {
  const [trips, setTrips] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const res = await getTrips();
      setTrips(res.data);
      setMsg("");
    } catch (err) {
      setMsg("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const markCompleted = async (id) => {
    try {
      setActionLoading(id);
      await updateTripStatus(id, "completed");
      setMsg("Trip marked as completed ✓");
      loadTrips();
    } catch {
      setMsg("Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  const removeTrip = async (id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        setActionLoading(id);
        await deleteTrip(id);
        setMsg("Trip deleted successfully");
        loadTrips();
      } catch {
        setMsg("Delete failed");
      } finally {
        setActionLoading(null);
      }
    }
  };

  const pendingTrips = trips.filter(t => t.status !== "completed").length;
  const completedTrips = trips.filter(t => t.status === "completed").length;

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
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                <i className="bi bi-grid-fill text-lg"></i>
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link
                to="/plan"
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                <i className="bi bi-plus-circle-fill text-lg"></i>
                <span className="hidden sm:inline">Plan Trip</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-2xl">
            <i className="bi bi-suitcase-lg-fill text-white text-4xl"></i>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            My Trips
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Manage and explore your travel adventures
          </p>
        </div>

        {/* Message Alert */}
        {msg && (
          <div className={`max-w-4xl mx-auto mb-6 p-4 rounded-2xl shadow-lg flex items-center gap-3 animate-fade-in ${msg.includes("Failed") || msg.includes("failed")
              ? "bg-red-50 border-2 border-red-300"
              : "bg-green-50 border-2 border-green-300"
            }`}>
            <i className={`text-2xl ${msg.includes("Failed") || msg.includes("failed")
                ? "bi bi-exclamation-circle-fill text-red-500"
                : "bi bi-check-circle-fill text-green-500"
              }`}></i>
            <p className={`font-semibold text-sm sm:text-base ${msg.includes("Failed") || msg.includes("failed")
                ? "text-red-700"
                : "text-green-700"
              }`}>
              {msg}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading your trips...</p>
          </div>
        ) : (
          <>
            {/* Empty State */}
            {trips.length === 0 ? (
              <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-2xl text-center border-2 border-green-200">
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="bi bi-airplane text-green-600 text-5xl"></i>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">No Trips Yet</h2>
                <p className="text-gray-600 text-base sm:text-lg mb-8 px-4">
                  Start planning your next adventure and create your first trip!
                </p>
                <Link
                  to="/plan"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <i className="bi bi-plus-circle-fill text-xl sm:text-2xl"></i>
                  Plan Your First Trip
                </Link>
              </div>
            ) : (
              <>
                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 max-w-5xl mx-auto">
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-green-200 hover:border-green-400 transform hover:-translate-y-1 duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        <i className="bi bi-map-fill text-white text-2xl"></i>
                      </div>
                      <div>
                        <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{trips.length}</p>
                        <p className="text-gray-600 text-sm font-semibold">Total Trips</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-amber-200 hover:border-amber-400 transform hover:-translate-y-1 duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <i className="bi bi-clock-history text-white text-2xl"></i>
                      </div>
                      <div>
                        <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{pendingTrips}</p>
                        <p className="text-gray-600 text-sm font-semibold">Pending</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-teal-200 hover:border-teal-400 transform hover:-translate-y-1 duration-300 sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                        <i className="bi bi-check-circle-fill text-white text-2xl"></i>
                      </div>
                      <div>
                        <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">{completedTrips}</p>
                        <p className="text-gray-600 text-sm font-semibold">Completed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {trips.map((trip) => (
                    <div
                      key={trip._id}
                      className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-green-200 hover:border-green-400 group transform hover:-translate-y-2"
                    >
                      {/* Card Header */}
                      <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="relative">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                              <i className="bi bi-geo-alt-fill text-black text-2xl"></i>
                            </div>
                            <span className={`px-3 py-1.5 text-xs font-bold rounded-full shadow-md ${trip.status === "completed"
                                ? "bg-white text-green-600"
                                : "bg-amber-100 text-amber-700"
                              }`}>
                              <i className={`bi ${trip.status === "completed"
                                  ? "bi-check-circle-fill"
                                  : "bi-clock-fill"
                                } mr-1`}></i>
                              {trip.status === "completed" ? "Completed" : "Pending"}
                            </span>
                          </div>

                          <h2 className="text-2xl font-bold text-white mb-2 line-clamp-1 drop-shadow-lg">
                            {trip.destination}
                          </h2>

                          <div className="flex items-center gap-2 text-green-50">
                            <i className="bi bi-pin-map-fill text-lg"></i>
                            <p className="text-sm font-medium">
                              From: <span className="font-bold text-white">{trip.startPlace}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                          <Link
                            to={`/trip/${trip._id}`}
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                          >
                            <i className="bi bi-eye-fill text-lg"></i>
                            View Details
                          </Link>

                          <div className="grid grid-cols-2 gap-3">
                            {trip.status !== "completed" && (
                              <button
                                onClick={() => markCompleted(trip._id)}
                                disabled={actionLoading === trip._id}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-md"
                              >
                                {actionLoading === trip._id ? (
                                  <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                ) : (
                                  <>
                                    <i className="bi bi-check-circle-fill"></i>
                                    <span className="hidden sm:inline">Complete</span>
                                  </>
                                )}
                              </button>
                            )}

                            <button
                              onClick={() => removeTrip(trip._id)}
                              disabled={actionLoading === trip._id}
                              className={`bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-md ${trip.status === "completed" ? "col-span-2" : ""
                                }`}
                            >
                              {actionLoading === trip._id ? (
                                <div className="spinner-border spinner-border-sm" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              ) : (
                                <>
                                  <i className="bi bi-trash-fill"></i>
                                  <span className="hidden sm:inline">Delete</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Decorative Bottom Border */}
                      <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
                    </div>
                  ))}
                </div>

                {/* Quick Action Button */}
                <div className="mt-12 text-center">
                  <Link
                    to="/plan"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    <i className="bi bi-plus-circle-fill text-2xl"></i>
                    Plan Another Trip
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TripsList;
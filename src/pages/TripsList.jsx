import React, { useEffect, useState } from "react";
import { getTrips, updateTripStatus, deleteTrip } from "../api/tripAPI";
import { Link } from "react-router-dom";

function TripsList() {
  const [trips, setTrips] = useState([]);
  const [msg, setMsg] = useState("");

  const loadTrips = async () => {
    try {
      const res = await getTrips();
      setTrips(res.data);
    } catch (err) {
      setMsg("Failed to load trips");
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const markCompleted = async (id) => {
    try {
      await updateTripStatus(id, "completed");
      setMsg("Trip marked as completed");
      loadTrips();
    } catch {
      setMsg("Failed to update status");
    }
  };

  const removeTrip = async (id) => {
    try {
      await deleteTrip(id);
      setMsg("Trip deleted");
      loadTrips();
    } catch {
      setMsg("Delete failed");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">My Trips</h1>

      {msg && <p className="text-red-600 font-semibold">{msg}</p>}

      {trips.length === 0 && (
        <p className="mt-6 text-gray-600">No trips found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {trips.map((trip) => (
          <div
            key={trip._id}
            className="bg-white p-5 rounded-lg shadow border"
          >
            <h2 className="text-xl font-bold">{trip.destination}</h2>
            <p className="text-gray-600">
              From: <strong>{trip.startPlace}</strong>
            </p>

            <p className="mt-1">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 text-sm rounded ${
                  trip.status === "completed"
                    ? "bg-green-200 text-green-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {trip.status}
              </span>
            </p>

            <div className="flex gap-3 mt-4">

              <Link
                to={`/trip/${trip._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View
              </Link>

              {trip.status !== "completed" && (
                <button
                  onClick={() => markCompleted(trip._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Complete
                </button>
              )}

              <button
                onClick={() => removeTrip(trip._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripsList;

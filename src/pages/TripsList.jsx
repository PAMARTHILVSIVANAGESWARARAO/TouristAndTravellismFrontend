import React, { useEffect, useState } from "react";
import { getAllTrips, deleteTrip } from "../api/tripAPI";
import { Link } from "react-router-dom";

function TripsList() {
  const [trips, setTrips] = useState([]);
  const [msg, setMsg] = useState("");

  const loadTrips = async () => {
    try {
      const res = await getAllTrips();
      setTrips(res.data);
    } catch (error) {
      console.log("Failed to load trips");
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this trip permanently?")) return;

    try {
      await deleteTrip(id);
      setMsg("Trip deleted!");
      loadTrips();
    } catch (error) {
      setMsg("Failed to delete trip");
    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        My Trips
      </h1>

      {msg && <p className="text-center text-green-600 mb-3">{msg}</p>}

      {/* No Trips */}
      {trips.length === 0 && (
        <p className="text-gray-700 text-lg text-center">
          No trips found. Create one from the Dashboard.
        </p>
      )}

      {/* Trips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {trips.map((trip) => (
          <div
            key={trip._id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-green-700 mb-2">
              {trip.startPlace} → {trip.destination}
            </h2>

            <p className="text-sm text-gray-600 mb-2">
              Status:{" "}
              <span className="font-semibold text-blue-700">
                {trip.status}
              </span>
            </p>

            <div className="flex justify-between mt-4">
              <Link
                to={`/trips/${trip._id}`}
                className="text-green-700 font-semibold hover:underline"
              >
                View
              </Link>

              <button
                onClick={() => handleDelete(trip._id)}
                className="text-red-600 font-semibold hover:underline"
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

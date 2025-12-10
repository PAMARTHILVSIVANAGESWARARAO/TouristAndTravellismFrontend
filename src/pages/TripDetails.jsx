import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTripById, updateTripStatus } from "../api/tripAPI";

function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [msg, setMsg] = useState("");

  const loadTrip = async () => {
    try {
      const res = await getTripById(id);
      setTrip(res);
    } catch (error) {
      console.log("Failed to load trip");
    }
  };

  useEffect(() => {
    loadTrip();
  }, []);

  const changeStatus = async (status) => {
    try {
      await updateTripStatus(id, status);
      setMsg("Status updated!");
      loadTrip();
    } catch (error) {
      setMsg("Failed to update status");
    }
  };

  if (!trip) {
    return (
      <div className="min-h-screen bg-green-100 p-6">
        <p className="text-center text-lg">Loading trip...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-100 p-6">

      <Link
        to="/trips"
        className="text-green-700 font-semibold hover:underline text-lg"
      >
        ← Back to Trips
      </Link>

      <h1 className="text-3xl font-bold text-green-700 mt-4 mb-6">
        {trip.startPlace} → {trip.destination}
      </h1>

      {msg && <p className="text-green-600 mb-4">{msg}</p>}

      {/* Status Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold text-xl mb-2">Status</h2>
        <p className="mb-3">
          Current:{" "}
          <span className="font-semibold text-blue-700">{trip.status}</span>
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => changeStatus("ongoing")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ongoing
          </button>

          <button
            onClick={() => changeStatus("completed")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Completed
          </button>

          <button
            onClick={() => changeStatus("cancelled")}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Budget Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold text-xl mb-3">Estimated Budget</h2>
        <p className="font-medium text-lg">
          {trip.budget?.estimatedTotal} {trip.budget?.currency}
        </p>

        <div className="mt-3 text-gray-700">
          {trip.budget?.breakdown &&
            Object.entries(trip.budget.breakdown).map(([key, value]) => (
              <p key={key}>
                <span className="font-semibold capitalize">{key}:</span> {value}
              </p>
            ))}
        </div>
      </div>

      {/* Flights Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold text-xl mb-3">Flights</h2>
        {trip.flights?.map((f, i) => (
          <p key={i} className="mb-2">
            ✈️ {f.flightName} — {f.price} {f.currency} ({f.duration})
          </p>
        ))}
      </div>

      {/* Locations Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold text-xl mb-3">Suggested Places</h2>
        {trip.locations?.map((loc, i) => (
          <p key={i} className="mb-1">
            📍 {loc.name} — {loc.recommendedTime}
          </p>
        ))}
      </div>

      {/* Itinerary Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold text-xl mb-3">Itinerary</h2>
        {trip.itinerary?.map((day, i) => (
          <div key={i} className="mb-3">
            <p className="font-semibold text-lg">Day {day.day}</p>
            {day.activities.map((act, j) => (
              <p key={j}>• {act}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Photos Button */}
      <div className="bg-white p-4 rounded shadow text-center">
        <Link
          to={`/photos?trip=${id}`}
          className="px-5 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Manage Photos
        </Link>
      </div>
    </div>
  );
}

export default TripDetails;

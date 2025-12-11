import React, { useEffect, useState } from "react";
import { getTripById } from "../api/tripAPI";
import { useParams, Link } from "react-router-dom";

function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [msg, setMsg] = useState("");

  const loadTrip = async () => {
    try {
      const res = await getTripById(id);
      setTrip(res.data);
    } catch (err) {
      setMsg("Failed to load trip details");
    }
  };

  useEffect(() => {
    loadTrip();
  }, [id]);

  if (!trip)
    return <div className="p-10 text-center">Loading trip details...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-4">{trip.destination} Trip</h1>

      {msg && <p className="text-red-600 font-semibold">{msg}</p>}

      <div className="bg-white p-6 rounded shadow-lg">

        {/* ♻ Trip Basic Info */}
        <p className="text-lg mb-4">
          <strong>From:</strong> {trip.startPlace}
        </p>

        <p className="text-lg mb-4">
          <strong>Status:</strong>{" "}
          <span
            className={`px-3 py-1 rounded text-sm ${
              trip.status === "completed"
                ? "bg-green-200 text-green-700"
                : "bg-yellow-200 text-yellow-700"
            }`}
          >
            {trip.status}
          </span>
        </p>

        {/* 💰 Budget */}
        <h2 className="text-2xl font-semibold mt-4 mb-2">Budget</h2>
        <p>
          Total: {trip.budget.estimatedTotal} {trip.budget.currency}
        </p>
        <ul className="ml-5 list-disc">
          {Object.entries(trip.budget.breakdown).map(([key, val]) => (
            <li key={key}>
              {key}: {val}
            </li>
          ))}
        </ul>

        {/* ✈ Flights */}
        <h2 className="text-2xl font-semibold mt-5 mb-2">Flights</h2>
        <ul className="ml-5 list-disc">
          {trip.flights.map((f, idx) => (
            <li key={idx}>
              {f.flightName} – {f.price} {f.currency} ({f.duration})
            </li>
          ))}
        </ul>

        {/* 📍 Locations */}
        <h2 className="text-2xl font-semibold mt-5 mb-2">Locations</h2>
        <ul className="ml-5 list-disc">
          {trip.locations.map((loc, idx) => (
            <li key={idx}>
              <strong>{loc.name}</strong>: {loc.description}
            </li>
          ))}
        </ul>

        {/* 🗓 Itinerary */}
        <h2 className="text-2xl font-semibold mt-5 mb-2">Itinerary</h2>

        {trip.itinerary.map((day, idx) => (
          <div key={idx} className="mb-3">
            <strong>Day {day.day}</strong>
            <ul className="ml-6 list-disc">
              {day.activities.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* 📸 Upload Photos */}
        <div className="mt-6">
          <Link
            to="/photos"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Manage Photos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;

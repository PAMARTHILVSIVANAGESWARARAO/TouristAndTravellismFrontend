import React, { useState } from "react";
import { generatePlan, createTrip } from "../api/tripAPI";

function PlanTrip() {
  const [form, setForm] = useState({
    startPlace: "",
    destination: "",
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const createAIPlan = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.startPlace || !form.destination) {
      setMsg("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await generatePlan(form);
      setPlan(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setMsg("Error generating plan");
    }
  };

  const saveTrip = async () => {
    try {
      setLoading(true);
      const res = await createTrip(plan);
      setLoading(false);
      setMsg("Trip saved successfully!");
    } catch (err) {
      setLoading(false);
      setMsg("Failed to save trip");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-4">Plan a New Trip 🌍</h1>

      {msg && <p className="text-red-600 font-semibold">{msg}</p>}

      {/* FORM */}
      <form onSubmit={createAIPlan} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <input
            type="text"
            name="startPlace"
            placeholder="Starting Place"
            className="p-3 border rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="destination"
            placeholder="Destination"
            className="p-3 border rounded"
            onChange={handleChange}
          />
        </div>

        <button
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Plan"}
        </button>
      </form>

      {/* DISPLAY GENERATED PLAN */}
      {plan && (
        <div className="bg-white p-6 rounded shadow-lg">

          <h2 className="text-2xl font-bold mb-4">AI Trip Plan</h2>

          {/* Budget */}
          <div className="mb-4">
            <h3 className="font-bold text-lg">Budget</h3>
            <p>
              Estimated Total: {plan.budget.estimatedTotal}{" "}
              {plan.budget.currency}
            </p>

            <ul className="ml-4 list-disc">
              {Object.entries(plan.budget.breakdown).map(([key, val]) => (
                <li key={key}>
                  {key}: {val}
                </li>
              ))}
            </ul>
          </div>

          {/* Flights */}
          <div className="mb-4">
            <h3 className="font-bold text-lg">Flights</h3>
            <ul className="ml-4 list-disc">
              {plan.flights.map((f, idx) => (
                <li key={idx}>
                  {f.flightName} – {f.price} {f.currency}
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="mb-4">
            <h3 className="font-bold text-lg">Locations</h3>
            <ul className="ml-4 list-disc">
              {plan.locations.map((loc, idx) => (
                <li key={idx}>
                  <strong>{loc.name}</strong> – {loc.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Itinerary */}
          <div className="mb-4">
            <h3 className="font-bold text-lg">Itinerary</h3>
            {plan.itinerary.map((day, idx) => (
              <div key={idx} className="mb-2">
                <strong>Day {day.day}</strong>
                <ul className="ml-6 list-disc">
                  {day.activities.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            onClick={saveTrip}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Trip
          </button>
        </div>
      )}
    </div>
  );
}

export default PlanTrip;

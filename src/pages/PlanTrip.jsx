import React, { useState } from "react";
import { planTrip, createTrip } from "../api/tripAPI";

function PlanTrip() {
  const [form, setForm] = useState({
    startPlace: "",
    destination: ""
  });

  const [loading, setLoading] = useState(false);
  const [aiTrip, setAiTrip] = useState(null);
  const [error, setError] = useState("");
  const [saveMsg, setSaveMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlanTrip = async (e) => {
    e.preventDefault();
    setError("");
    setSaveMsg("");

    if (!form.startPlace || !form.destination) {
      setError("Both fields are required");
      return;
    }

    try {
      setLoading(true);
      const result = await planTrip(form);
      setAiTrip(result.data);
    } catch (error) {
      setError("Failed to generate trip plan");
    } finally {
      setLoading(false);
    }
  };

  const saveTrip = async () => {
    try {
      const res = await createTrip(aiTrip);
      setSaveMsg("Trip saved successfully!");
    } catch (error) {
      setSaveMsg("Failed to save trip");
    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <div className="bg-white p-8 shadow rounded-lg max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Plan a Trip
        </h1>

        {/* Error */}
        {error && <p className="text-red-600 mb-3">{error}</p>}

        {/* Trip Planner Form */}
        <form onSubmit={handlePlanTrip} className="space-y-4 mb-8">
          
          <div>
            <label className="font-semibold block mb-1">Starting Place</label>
            <input
              type="text"
              name="startPlace"
              value={form.startPlace}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              placeholder="Hyderabad"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Destination</label>
            <input
              type="text"
              name="destination"
              value={form.destination}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              placeholder="Goa"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 font-semibold rounded hover:bg-green-700"
          >
            {loading ? "Generating..." : "Generate Trip Plan"}
          </button>

        </form>

        {/* AI Generated Trip Display */}
        {aiTrip && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner space-y-3">

            <h2 className="text-2xl font-bold text-green-700">
              Suggested Trip Plan
            </h2>

            <p><strong>From:</strong> {aiTrip.startPlace}</p>
            <p><strong>To:</strong> {aiTrip.destination}</p>

            {/* Budget */}
            <div>
              <h3 className="font-bold text-lg">Estimated Budget:</h3>
              <p>{aiTrip.budget?.estimatedTotal} {aiTrip.budget?.currency}</p>
            </div>

            {/* Flights */}
            <div>
              <h3 className="font-bold text-lg">Flights:</h3>
              {aiTrip.flights?.map((f, i) => (
                <p key={i}>
                  {f.flightName} — {f.price} {f.currency}
                </p>
              ))}
            </div>

            {/* Locations */}
            <div>
              <h3 className="font-bold text-lg">Locations:</h3>
              {aiTrip.locations?.map((loc, i) => (
                <p key={i}>
                  • {loc.name} — {loc.recommendedTime}
                </p>
              ))}
            </div>

            {/* Itinerary */}
            <div>
              <h3 className="font-bold text-lg">Itinerary:</h3>
              {aiTrip.itinerary?.map((day, i) => (
                <div key={i}>
                  <p className="font-semibold">Day {day.day}</p>
                  {day.activities.map((act, j) => (
                    <p key={j}>• {act}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Save Trip Button */}
            <button
              onClick={saveTrip}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
            >
              Save This Trip
            </button>

            {saveMsg && (
              <p className="text-center text-green-600 mt-3 font-medium">
                {saveMsg}
              </p>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default PlanTrip;

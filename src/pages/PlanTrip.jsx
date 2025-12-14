import React, { useState } from "react";
import { generatePlan, createTrip } from "../api/tripAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlanTrip() {
  const [form, setForm] = useState({
    startPlace: "",
    destination: "",
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const createAIPlan = async (e) => {
    e.preventDefault();

    if (!form.startPlace || !form.destination) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setProgress(30);

      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 300);

      const res = await generatePlan(form);
      clearInterval(interval);
      setProgress(100);
      setPlan(res.data);

      toast.success("AI Trip Plan Generated Successfully!");
      setTimeout(() => setProgress(0), 800);
    } catch {
      toast.error("Error generating plan");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const saveTrip = async () => {
    try {
      setLoading(true);
      setProgress(40);
      await createTrip(plan);
      setProgress(100);
      toast.success("Trip saved successfully!");
      setTimeout(() => setProgress(0), 800);
    } catch {
      toast.error("Failed to save trip");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
          <i className="bi bi-globe-americas text-white text-4xl"></i>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
          Plan Your Dream Trip
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Let AI craft the perfect itinerary for your next adventure
        </p>
      </div>

      {/* Form Section */}
      <form
        onSubmit={createAIPlan}
        className="max-w-5xl mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-green-200 transition-all duration-500 border border-green-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Starting Place Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="bi bi-geo-alt-fill text-green-500 text-xl group-focus-within:text-green-600 transition-colors"></i>
            </div>
            <input
              type="text"
              name="startPlace"
              placeholder="Starting Place"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
              onChange={handleChange}
              value={form.startPlace}
            />
          </div>

          {/* Destination Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="bi bi-pin-map-fill text-green-500 text-xl group-focus-within:text-green-600 transition-colors"></i>
            </div>
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              className="mb-3 w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
              onChange={handleChange}
              value={form.destination}
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          disabled={loading}
          className="mt-8 w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              Generating...
            </>
          ) : (
            <>
              <i className="bi bi-stars text-2xl"></i>
              Generate AI Plan
            </>
          )}
        </button>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="mt-6 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full transition-all duration-300 shadow-lg relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
        )}
      </form>

      {/* Plan Display Section */}
      {plan && (
        <div className="max-w-6xl mx-auto mt-12 animate-fade-in">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 rounded-3xl shadow-2xl mb-8 text-white">
            <div className="flex items-center gap-4 mb-2">
              <i className="bi bi-star-fill text-yellow-300 text-3xl"></i>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Your Perfect Trip Plan
              </h2>
            </div>
            <p className="text-green-50 text-lg">
              AI-crafted itinerary tailored just for you
            </p>
          </div>

          {/* Budget & Flights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Budget Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i className="bi bi-wallet2 text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Budget</h3>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl mb-4">
                <p className="text-3xl font-bold text-green-600">
                  {plan.budget.estimatedTotal} {plan.budget.currency}
                </p>
                <p className="text-gray-600 text-sm mt-1">Estimated Total</p>
              </div>

              <div className="space-y-3">
                {Object.entries(plan.budget.breakdown).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl hover:bg-green-50 transition-colors">
                    <span className="text-gray-700 font-medium capitalize flex items-center gap-2">
                      <i className="bi bi-check-circle-fill text-green-500"></i>
                      {k}
                    </span>
                    <span className="text-gray-900 font-bold">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flights Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i className="bi bi-airplane-fill text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Flights</h3>
              </div>

              <div className="space-y-4">
                {plan.flights.map((f, i) => (
                  <div key={i} className="bg-gradient-to-br from-teal-50 to-emerald-50 p-5 rounded-2xl hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-lg mb-1 flex items-center gap-2">
                          <i className="bi bi-airplane text-teal-600"></i>
                          {f.flightName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-teal-600">
                          {f.price}
                        </p>
                        <p className="text-sm text-gray-600">{f.currency}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Locations Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 mb-6 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="bi bi-geo-fill text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Top Locations</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {plan.locations.map((loc, i) => (
                <div key={i} className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-green-100">
                  <div className="flex items-start gap-3">
                    <i className="bi bi-pin-map-fill text-green-600 text-xl mt-1"></i>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">{loc.name}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{loc.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 mb-8 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="bi bi-calendar-check-fill text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Day-by-Day Itinerary</h3>
            </div>

            <div className="space-y-6">
              {plan.itinerary.map((day, i) => (
                <div key={i} className="relative pl-8 pb-6 last:pb-0">
                  {/* Timeline Line */}
                  {i !== plan.itinerary.length - 1 && (
                    <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gradient-to-b from-green-300 to-emerald-300"></div>
                  )}
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-0 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full border-4 border-white shadow-lg"></div>

                  <div className="bg-gradient-to-br from-gray-50 to-green-50 p-5 rounded-2xl hover:shadow-md transition-all">
                    <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <i className="bi bi-calendar-event text-green-600"></i>
                      Day {day.day}
                    </h4>
                    <ul className="space-y-2">
                      {day.activities.map((a, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-700 hover:text-green-700 transition-colors">
                          <i className="bi bi-check-circle-fill text-green-500 text-sm mt-1"></i>
                          <span className="flex-1">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Trip Button */}
          <button
            onClick={saveTrip}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <i className="bi bi-bookmark-check-fill text-2xl"></i>
                Save This Trip
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default PlanTrip;
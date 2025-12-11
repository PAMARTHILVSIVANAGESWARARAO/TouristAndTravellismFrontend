import axiosInstance from "./axiosInstance";

// AI Trip Planner
export const generatePlan = async (data) => {
  const res = await axiosInstance.post("/trips/plan", data);
  return res.data;
};

// Create Trip
export const createTrip = async (data) => {
  const res = await axiosInstance.post("/trips", data);
  return res.data;
};

// Get all Trips
export const getTrips = async () => {
  const res = await axiosInstance.get("/trips");
  return res.data;
};

// Get Trip by ID
export const getTripById = async (id) => {
  const res = await axiosInstance.get(`/trips/${id}`);
  return res.data;
};

// Update Trip Status
export const updateTripStatus = async (id, status) => {
  const res = await axiosInstance.patch(`/trips/${id}/status`, { status });
  return res.data;
};

// Delete Trip
export const deleteTrip = async (id) => {
  const res = await axiosInstance.delete(`/trips/${id}`);
  return res.data;
};

import axiosInstance from "./axiosInstance";

// 1. Plan Trip (AI-generated)
export const planTrip = async (data) => {
  const res = await axiosInstance.post("/api/trips/plan", data);
  return res.data;
};

// 2. Save Trip
export const createTrip = async (data) => {
  const res = await axiosInstance.post("/api/trips", data);
  return res.data;
};

// 3. Get all trips
export const getAllTrips = async () => {
  const res = await axiosInstance.get("/api/trips");
  return res.data;
};

// 4. Get single trip by ID
export const getTripById = async (id) => {
  const res = await axiosInstance.get(`/api/trips/${id}`);
  return res.data;
};

// 5. Update status (completed / ongoing / cancelled)
export const updateTripStatus = async (id, status) => {
  const res = await axiosInstance.patch(`/api/trips/${id}/status`, { status });
  return res.data;
};

// 6. Delete a trip
export const deleteTrip = async (id) => {
  const res = await axiosInstance.delete(`/api/trips/${id}`);
  return res.data;
};

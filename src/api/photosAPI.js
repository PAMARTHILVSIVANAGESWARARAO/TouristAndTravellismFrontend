import axiosInstance from "./axiosInstance";

// Upload Photo to Trip
export const uploadPhoto = async (tripId, formData) => {
  const res = await axiosInstance.post(`/trips/${tripId}/photos`, formData);
  return res.data;
};

// Get photos of a specific trip
export const getTripPhotos = async (tripId) => {
  const res = await axiosInstance.get(`/trips/${tripId}/photos`);
  return res.data;
};

// Get all photos of user
export const getUserPhotos = async () => {
  const res = await axiosInstance.get("/photos");
  return res.data;
};

// Delete photo
export const deletePhoto = async (photoId) => {
  const res = await axiosInstance.delete(`/photos/${photoId}`);
  return res.data;
};

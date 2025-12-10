import axiosInstance from "./axiosInstance";

// 1. Upload photo to a trip
export const uploadTripPhoto = async (tripId, formData) => {
  const res = await axiosInstance.post(
    `/api/trips/${tripId}/photos`,
    formData
  );
  return res.data;
};

// 2. Get all photos of a trip
export const getTripPhotos = async (tripId) => {
  const res = await axiosInstance.get(`/api/trips/${tripId}/photos`);
  return res.data;
};

// 3. Get all photos (global gallery)
export const getAllPhotos = async () => {
  const res = await axiosInstance.get("/api/photos");
  return res.data;
};

// 4. Delete a specific photo
export const deletePhoto = async (photoId) => {
  const res = await axiosInstance.delete(`/api/photos/${photoId}`);
  return res.data;
};

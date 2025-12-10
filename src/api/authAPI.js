import axiosInstance from "./axiosInstance";

// Register user
export const registerUser = async (data) => {
  const res = await axiosInstance.post("/api/auth/register", data);
  return res.data;
};

// Login user
export const loginUser = async (data) => {
  const res = await axiosInstance.post("/api/auth/login", data);
  return res.data;
};

// Get logged-in profile
export const getProfile = async () => {
  const res = await axiosInstance.get("/api/auth/profile");
  return res.data;
};

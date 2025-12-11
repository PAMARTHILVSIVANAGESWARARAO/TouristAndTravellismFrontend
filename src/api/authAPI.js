import axiosInstance from "./axiosInstance";

export const registerUser = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const getProfile = async () => {
  const res = await axiosInstance.get("/auth/profile");
  return res.data;
};

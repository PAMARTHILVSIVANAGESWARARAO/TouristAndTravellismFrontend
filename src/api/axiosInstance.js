import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://touristandtravelism.onrender.com/api",
});

// Auto attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Auto logout on unauthorized
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;

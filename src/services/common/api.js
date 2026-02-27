import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL|| "http://localhost:8181/restroly",
});

// Add interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    // Add token only for secure APIs
    if (accessToken && config.url.includes("/secure/")) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
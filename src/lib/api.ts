import axios from "axios";
import { getAccessToken, setAccessToken } from "./token";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach memory-only access token to requests
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle responses and auto-refresh
api.interceptors.response.use(
  (response) => {
    // Update access token if backend sends a new one
    const newAccessToken = response.headers["x-access-token"];
    if (newAccessToken) {
      setAccessToken(newAccessToken);
      console.log("[AUTH] Access token refreshed");
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Try refreshing access token using HttpOnly refresh cookie
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/sessions/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (_err) {
        setAccessToken(null);
        // optional: redirect to login
        // window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// Optional: helper to refresh access token on page load
export const refreshAccessTokenOnLoad = async () => {
  try {
    const res = await api.post("/api/sessions/refresh");
    setAccessToken(res.data.accessToken);
    console.log("[AUTH] Access token restored on page load");
  } catch {
    setAccessToken(null);
  }
};

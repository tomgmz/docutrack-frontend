import axios from "axios";
import { getAccessToken, setAccessToken } from "./token"; // <- import memory token

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token from memory
api.interceptors.request.use((config) => {
  const token = getAccessToken(); // <- memory-only
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Refresh access token if expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/sessions/reIssueToken`,
          {}, 
          { withCredentials: true } // send HttpOnly refresh cookie automatically
        );

        // Store new access token in memory
        setAccessToken(res.data.accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
        return axios(originalRequest); 
      } catch (refreshError) {
        setAccessToken(null); // clear memory
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

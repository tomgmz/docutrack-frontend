import axios from "axios";
import { getAccessToken, setAccessToken } from "./token";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Request: Attach the current token from memory
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 2. Response: Monitor for new tokens sent by the backend middleware
api.interceptors.response.use(
  (response) => {
    // Look for the 'x-access-token' header you set in deserializeUser.ts
    const newAccessToken = response.headers["x-access-token"];

    if (newAccessToken) {
      setAccessToken(newAccessToken);
      console.log("[AUTH] Access token silently refreshed by server");
    }

    return response;
  },
  async (error) => {
    // If the server returns 401, it means BOTH the access token 
    // and the refresh token (cookie/header) are expired or invalid.
    if (error.response?.status === 401) {
      setAccessToken(null);
      // Optional: Redirect to login or show a "Session Expired" modal
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
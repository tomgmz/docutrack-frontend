import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = (payload: {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
}) => {
  return api.post("/api/signup", payload);
};

export const login = (payload: {
  email: string;
  password: string;
}) => {
  return api.post("/api/login", payload);
};

export const signout = () => {
  return api.post("/api/signout");
};

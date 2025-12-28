import axios from "axios";
import { supabase } from "./supabase";

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

export function handleGoogleLogin() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/google`;
}

export async function confirmEmailSignup(
  token_hash: string,
  email: string,
  hashedNonce: string
) {
  // Optionally store the hashedNonce in a secure backend or validate with Supabase
  return supabase.auth.verifyOtp({
    type: "signup",
    token: token_hash,
    email,
    // attach hashedNonce if your backend/Supabase endpoint supports it
  });
}

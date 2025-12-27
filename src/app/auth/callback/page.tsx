"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Get hash fragment
    const hash = window.location.hash.substring(1); // remove #
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      // Store token securely (e.g., in HttpOnly cookie via backend or localStorage)
      localStorage.setItem("supabase_access_token", accessToken);
      router.replace("/home"); // redirect to your app
    } else {
      console.error("No access token found in callback");
    }
  }, [router]);

  return <div>Signing you in...</div>;
}

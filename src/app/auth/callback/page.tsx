"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      localStorage.setItem("supabase_access_token", accessToken);
      router.replace("/userHome");
    } else {
      console.error("No access token found in callback");
    }
  }, [router]);

  return <div>Signing you in...</div>;
}

"use client";

import { useEffect } from "react";
import { refreshAccessTokenOnLoad } from "@/lib/api";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Restore access token from HttpOnly cookie
    refreshAccessTokenOnLoad();
  }, []);

  return <>{children}</>;
}

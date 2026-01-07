"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/userHome");
  }, [router]);

  return <div>Signing you in...</div>;
}

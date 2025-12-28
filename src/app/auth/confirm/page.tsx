"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { confirmEmailSignup } from "@/lib/auth.api";

export default function ConfirmEmail() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get("token_hash");
    const email = params.get("email");

    if (!token_hash || !email) return;

    confirmEmailSignup(token_hash, email).then(({ error }) => {
      if (error) {
        alert("Confirmation failed: " + error.message);
      } else {
        alert("Email confirmed! You can now login.");
        router.push("/");
      }
    });
  }, [router]);

  return <p>Confirming your email...</p>;
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { confirmEmailSignup } from "@/lib/auth.api";

function generateNonce(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

export default function ConfirmEmail() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get("token_hash");
    const email = params.get("email");

    if (!token_hash || !email) return;

    const nonce = generateNonce();
    sessionStorage.setItem("confirm_nonce", nonce);

    // hashh the nonce with SHA-256 for sending to backend/Supabase
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(nonce)).then((hashedBuffer) => {
      const hashedNonce = Array.from(new Uint8Array(hashedBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // call API
      confirmEmailSignup(token_hash, email, hashedNonce).then(({ error }) => {
        sessionStorage.removeItem("confirm_nonce");

        if (error) {
          alert("Confirmation failed: " + error.message);
        } else {
          alert("Email confirmed! You can now login.");
          router.push("/");
        }
      });
    });
  }, [router]);

  return <p>Confirming your email...</p>;
}

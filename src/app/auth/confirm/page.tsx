"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // App Router version
import { supabase } from "@/lib/supabase";

export default function ConfirmEmail() {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const token_hash = searchParams.get("token_hash");
  const email = searchParams.get("email");

  useEffect(() => {
    if (token_hash && email) {
      const confirm = async () => {
        const { error } = await supabase.auth.verifyOtp({
          type: "signup",
          token: token_hash,
          email: email,
        });

        if (error) {
          alert("Confirmation failed: " + error.message);
        } else {
          alert("Email confirmed! You can now login.");
          router.push("/");
        }
      };
      confirm();
    }
  }, [token_hash, email]);

  return <p>Confirming your email...</p>;
}

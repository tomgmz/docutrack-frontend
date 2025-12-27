"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // App Router version
import { supabase } from "@/lib/supabase";

export default function ConfirmEmail() {
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token_hash = searchParams.get("token_hash");
    const email = searchParams.get("email");

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
  }, [router]);

  return <p>Confirming your email...</p>;
}

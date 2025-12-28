"use client";

import { Button } from "@mui/material";
import { api } from "@/lib/api";

export default function GoogleButton() {
  function handleGoogleLogin() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/google`;
  }

  return (
    <Button
      variant="outlined"
      onClick={handleGoogleLogin}
      sx={{
        fontFamily: "League Spartan, sans-serif",
        fontWeight: "700",
        fontSize: "22px",
        borderColor: "#000000",
        borderRadius: "10px",
        borderWidth: 2,
        color: "#122074",
      }}
    >
      Google
    </Button>
  );
}

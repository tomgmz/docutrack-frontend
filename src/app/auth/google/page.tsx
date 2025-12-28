"use client";

import { handleGoogleLogin } from "@/lib/auth.api";

import { Button } from "@mui/material";
import { api } from "@/lib/auth.api";

export default function GoogleButton() {

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

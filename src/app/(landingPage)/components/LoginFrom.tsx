"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";
import { api } from "@/lib/api";
import { setAccessToken } from "@/lib/token"; // memory-only access token

const textfieldStyle = {
  fontFamily: "Didact, sans-serif",
  borderRadius: "10px",
  font: "20px",
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: 2,
    borderRadius: "10px",
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderWidth: 2,
    borderRadius: "10px",
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderWidth: 2,
    borderRadius: "10px",
  },
};

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/sessions/userSession", { email, password });

      // Store access token in memory (no localStorage/sessionStorage)
      setAccessToken(res.data.accessToken);

      router.replace("/home");
      alert("Login successful!");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center mt-10 gap-6">
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={textfieldStyle}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        className="mt-4"
        sx={textfieldStyle}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button
        onClick={handleLogin}
        disabled={loading}
        className="mt-4"
        variant="outlined"
        fullWidth
        sx={{
          fontFamily: "League Spartan, sans-serif",
          fontWeight: "700",
          fontSize: "22px",
          bgcolor: "#06103D",
          borderColor: "#06103D",
          borderRadius: "10px",
          color: "#FFFFFF",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </div>
  );
}

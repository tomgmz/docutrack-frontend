"use client";

export default function LoginPage() {
  const handleLogin = () => {
    // Hit your BFF OAuth route instead of Supabase directly
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    window.location.href = `${baseUrl}/auth/google`;
  };

  return <button onClick={handleLogin}>Login with Google</button>;
}

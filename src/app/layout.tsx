"use client";

import type { Metadata } from "next";
import { Didact_Gothic } from "next/font/google";
import "./globals.css";
import { AppThemeProvider } from "@/components/theme/theme-provider";
import { useEffect } from "react";
import { refreshAccessTokenOnLoad } from "@/lib/api"; // import our helper

const didact = Didact_Gothic({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-didact',
  fallback: ['sans-serif'],
});

export const metadata: Metadata = {
  title: "STACKDUP",
  description: "Document Tracking System",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  useEffect(() => {
    // Restore memory-only access token using the HttpOnly refresh cookie
    refreshAccessTokenOnLoad();
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${didact.variable} antialiased`}>
        <AppThemeProvider>
          {children}
        </AppThemeProvider>
      </body>
    </html>
  );
}

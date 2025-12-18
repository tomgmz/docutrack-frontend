import type { Metadata } from "next";
import { Didact_Gothic } from "next/font/google";
import "./globals.css";
import { AppThemeProvider } from "@/components/theme/theme-provider";

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

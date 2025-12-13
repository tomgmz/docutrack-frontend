import type { Metadata } from "next";
import { Didact_Gothic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme/theme-provider";


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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${didact.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

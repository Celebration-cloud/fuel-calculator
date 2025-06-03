import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";

// Load Geist Sans font and set CSS variable
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Load Geist Mono font and set CSS variable
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the Fuel Calculator app
export const metadata = {
  title: "Fuel Calculator",
  description: "Easily calculate your fuel usage and costs.",
};

// Simple dark mode toggle component
function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      aria-label="Toggle dark mode"
      className="ml-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition"
      onClick={() => setDark((d) => !d)}
      type="button"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}

// Root layout for the Fuel Calculator app
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`
            ${geistSans.variable} ${geistMono.variable} antialiased
            bg-gradient-to-br from-green-100 via-white to-blue-100
            dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-gray-800
            min-h-screen transition-colors
          `}
        >
          <header className="flex justify-between items-center px-8 py-6 bg-white/80 dark:bg-gray-900/80 shadow-xl border-b border-green-100 dark:border-gray-800 rounded-b-2xl">
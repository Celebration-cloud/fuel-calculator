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

// Root layout for the Fuel Calculator app
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
        suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-green-100 via-white to-blue-100 min-h-screen`}
        >
          <header className="flex justify-between items-center px-8 py-6 bg-white/80 shadow-xl border-b border-green-100">
            <h1 className="text-3xl font-extrabold text-green-700 tracking-tight flex items-center gap-2">
              <span className="text-4xl">🚗</span>
              <span>Fuel Cost Calculator</span>
            </h1>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <button className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main className="">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

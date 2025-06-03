import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="flex justify-between items-center px-8 py-6 bg-white/80 shadow-md">
            <h1 className="text-3xl font-extrabold text-green-700 tracking-tight">
              🚗 Fuel Cost Calculator
            </h1>
            <div className="flex items-center gap-3">

            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

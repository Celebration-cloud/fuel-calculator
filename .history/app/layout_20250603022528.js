// app/layout.tsx
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
import { ThemeProvider } from "./providers/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fuel Calculator",
  description: "Easily calculate your fuel usage and costs.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white`}
        >
          <ThemeProvider>
            <header className="flex justify-between items-center px-8 py-6 bg-white/80 dark:bg-zinc-800/80 shadow-xl border-b border-green-100 dark:border-zinc-700">
              <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-300 tracking-tight flex items-center gap-2">
                <span className="text-4xl">🚗</span>
                <span>Fuel Cost Calculator</span>
              </h1>
              <div className="flex items-center gap-4">
                <ThemeToggle /
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
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

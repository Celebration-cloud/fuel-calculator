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
import Link from "next/link";

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
                {/* <ThemeToggle/> */}
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
            {/* Modern UI Footer */}
            <footer className="w-full mt-12 bg-white/80 dark:bg-zinc-900/80 border-t border-green-100 dark:border-zinc-700 py-6 flex flex-col items-center gap-2 transition-colors">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300 font-bold text-lg">
                <span className="text-2xl">⛽</span>
                <span>Fuel Calculator</span>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} All rights reserved.
              </div>
              <div className="flex gap-4 mt-1">
                <Link
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition"
                >
                  GitHub
                </Link>
                <Link
                  href="/privacy"
                  className="text-gray-500 dark:text-gray-400 hover:underline hover:text-green-700 dark:hover:text-green-300 transition"
                >
                  Privacy
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-500 dark:text-gray-400 hover:underline hover:text-green-700 dark:hover:text-green-300 transition"
                >
                  Contact
                </Link>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

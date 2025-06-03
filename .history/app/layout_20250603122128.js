// app/layout.tsx
// Import fonts, global styles, Clerk authentication, theme provider, and footer
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
import AppFooter from "@/components/AppFooter";

// Load custom fonts for the app
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// App metadata for SEO and browser
export const metadata = {
  title: "Fuel Calculator",
  description: "Easily calculate your fuel usage and costs.",
};

// Root layout wraps the entire app with ClerkProvider and ThemeProvider
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white`}
        >
          {/* ThemeProvider enables dark mode and theme switching */}
          <ThemeProvider>
            {/* Responsive App header with logo, title, and authentication buttons */}
            <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 px-4 md:px-8 py-4 md:py-6 bg-white/80 dark:bg-zinc-800/80 shadow-xl border-b border-green-100 dark:border-zinc-700">
              <h1 className="text-2xl md:text-3xl font-extrabold text-green-700 dark:text-green-300 tracking-tight flex items-center gap-2 justify-center md:justify-start">
                <span className="text-3xl md:text-4xl">🚗</span>
                <span>Fuel Cost Calculator</span>
              </h1>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                {/* Show Sign In/Sign Up buttons if signed out */}
                <SignedOut>
                  <SignInButton>
                    <button className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition w-full sm:w-auto">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition w-full sm:w-auto">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                {/* Show user button if signed in */}
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </header>
            {/* Main content area, responsive padding and centering */}
            <main className="flex flex-col items-center justify-center flex-1 w-full px-2 sm:px-4 md:px-8 py-4 md:py-8">
              {children}
              <Analytics />
            </main>
            {/* Modern UI footer, responsive */}
            <AppFooter />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

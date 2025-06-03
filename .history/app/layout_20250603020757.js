import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { DarkModeToggle, AuthButtons } from "@/components/ClientLayoutFeatures";

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
            <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-300 tracking-tight flex items-center gap-2">
              <span className="text-4xl">🚗</span>
              <span>Fuel Cost Calculator</span>
            </h1>
            <div className="flex items-center gap-4">
              <DarkModeToggle />
              <AuthButtons />
            </div>
          </header>
          <main className="flex flex-col items-center justify-center flex-1 w-full transition-colors">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

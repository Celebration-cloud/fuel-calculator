// app/layout.tsx
// Import fonts, global styles, Clerk authentication, theme provider, and footer
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./providers/theme-provider";
import AppFooter from "@/components/AppFooter";
import AuthButtons from "@/components/AuthButtons";

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
            {/* App header with logo, title, and authentication buttons */}
            <header className="flex justify-between items-center px-8 py-6 bg-white/80 dark:bg-zinc-800/80 shadow-xl border-b border-green-100 dark:border-zinc-700">
              <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-300 tracking-tight flex items-center gap-2">
                <span className="text-4xl max-md:text-xl max-sm:text-sm">
                  🚗
                </span>
                <span className="max-md:text-xl max-sm:text-sm">
                  Fuel Cost Calculator
                </span>
              </h1>
              {/* Auth buttons (Sign In/Sign Up/User) */}
              <AuthButtons />
            </header>
            {/* Main content area */}
            <main>
              {children}
              <Analytics />
            </main>
            {/* Modern UI footer */}
            <AppFooter />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

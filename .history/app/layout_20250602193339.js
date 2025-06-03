import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      
    </ClerkProvider>
    <html lang="en">
      <body
        // Apply loaded fonts and antialiasing for better text rendering
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Main content will be rendered here */}
        {children}
      </body>
    </html>
  );
}

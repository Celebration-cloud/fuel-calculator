"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {/* This provider allows you to manage themes in your Next.js app */}
      {children}
    </NextThemesProvider>
  );
}

// app/components/AuthModal.tsx
"use client";
import { SignIn, useUser } from "@clerk/nextjs";

export default function AuthModal() {
  const { isSignedIn, isLoaded } = useUser();

  // Only show modal if Clerk is loaded and user is not signed in
  if (!isLoaded) return null;

  return <a
}

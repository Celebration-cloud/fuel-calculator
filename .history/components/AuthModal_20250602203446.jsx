// app/components/AuthModal.tsx
"use client";
import { SignIn, useUser } from "@clerk/nextjs";

export default function AuthModal() {
  const { isSignedIn, isLoaded } = useUser();

  // Only show modal if Clerk is loaded and user is not signed in
  // if (!isLoaded) return null;

  return !isSignedIn ? (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <SignIn path="/sign-in" />
      </div>
    </div>
  ) : null;
}

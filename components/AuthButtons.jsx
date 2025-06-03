"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

// Responsive Auth Buttons for header
export default function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      {/* Show Sign In/Sign Up buttons if signed out */}
      <SignedOut>
        <SignInButton>
          <button className="px-4 py-2 rounded-lg max-md:px-2 max-sm:px-1 max-md:py-1 max-sm:py-1 max-md:text-xl max-sm:text-sm bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="px-4 py-2 rounded-lg max-md:px-2 max-sm:px-1 max-md:py-1 max-sm:py-1 max-md:text-xl max-sm:text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      {/* Show user button if signed in */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

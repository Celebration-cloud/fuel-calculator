// Import the FuelCalculator component (main calculator UI)
import FuelCalculator from "@/components/FuelCalculator";
// Import Clerk authentication helpers for conditional rendering
import { SignedIn, SignedOut } from "@clerk/nextjs";
// Import the AuthModal component (sign-in modal)
import AuthModal from "@/components/AuthModal";

// Main Home page component
export default function Home() {
  return (
    // Set up the main container with Tailwind classes for min height and dark mode support
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col transition-colors">
      <main className="flex flex-1 flex-col items-center justify-center py-12">
        {/* Show FuelCalculator only if the user is signed in */}
        <SignedIn>
          <FuelCalculator />
        </SignedIn>
        {/* Show AuthModal (sign-in prompt) if the user is signed out */}
        <SignedOut>
          <AuthModal />
        </SignedOut>
      </main>
    </div>
  );
}
// This is the main entry point for the Next.js application
// It renders the FuelCalculator component for signed-in users
// and shows the AuthModal for signed-out users to prompt sign-in.
// The layout and styles are handled using Tailwind CSS for a responsive and modern design.
// The page is structured to be accessible and user-friendly,
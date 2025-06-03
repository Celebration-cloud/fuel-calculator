import AuthModal from "@/components/AuthModal";
import CalculatorForm from "@/components/CalculatorForm";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 flex flex-col transition-colors">
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center py-12">
        <SignedIn>
          <CalculatorForm />
        </SignedIn>
        <SignedOut>
          <AuthModal />
        </SignedOut>
      </main>
      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm bg-white/70 dark:bg-gray-900/70 border-t border-green-100 dark:border-gray-800 transition-colors">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-green-700 dark:text-green-300">
          Fuel Calculator
        </span>
        . All rights reserved.
      </footer>
    </div>
  );
}

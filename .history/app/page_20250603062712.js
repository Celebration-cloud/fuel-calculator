import AuthModal from "@/components/AuthModal";
import CalculatorForm from "@/components/CalculatorForm";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col transition-">
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
      <footer className="text-center py-6 text-gray-500 text-sm bg-white dark:bg-gray-900 border-t border-green-100 dark:border-gray-800 transition-colors">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-green-700 dark:text-green-300">
          Fuel Calculator
        </span>
        . All rights reserved.
      </footer>
    </div>
  );
}

import CalculatorForm from "@/components/CalculatorForm";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen dark:text-gray-100 bg-white dark:bg-gray-800 flex flex-col">
      {/* Main Content */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/80 dark:bg-gray-800/80 shadow-xl border-b border-green-100 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-300 tracking-tight flex items-center gap-2">
          <span className="text-4xl">🚗</span>
          <span>Fuel Cost Calculator</span>
        </h1>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignIn />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      <main className="flex flex-1 flex-col items-center justify-center py-12">
        <SignedIn>
          <CalculatorForm />
        </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </main>
      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm bg-white/70 border-t border-green-100">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-green-700">Fuel Calculator</span>.
        All rights reserved.
      </footer>
    </div>
  );
}

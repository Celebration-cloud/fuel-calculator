import CalculatorForm from "@/components/CalculatorForm";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-b from-green-100 via-white to-blue-100 flex  flex-col">
      {/* Main Content */}
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

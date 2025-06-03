import CalculatorForm from "@/components/CalculatorForm";
import AuthModal from "@/components/AuthModal";
import { SignedOut } from "@clerk/nextjs";

export default function Home() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex flex-col">
      {/* Auth Modal for users not signed in */}
      <SignedOut>
        <AuthModal />
      </SignedOut>
      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center py-12">
        <section className="w-full max-w-xl bg-white/80 rounded-2xl shadow-2xl p-8 border border-green-100">
          <CalculatorForm />
        </section>
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

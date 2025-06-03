import CalculatorForm from "@/components/CalculatorForm";
import AuthModal from "@/components/AuthModal";
import { SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function Home() {
  const { userId } = auth();
  // if (!userId) return <AuthModal />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex flex-col">
      {/* Main Content */}
        <section className="w-full max-w-xl bg-white/80 rounded-2xl shadow-2xl p-8 border border-green-100">
          <CalculatorForm />
        </section>
      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm bg-white/70 border-t border-green-100">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-green-700">Fuel Calculator</span>.
        All rights reserved.
      </footer>
    </div>
  );
}

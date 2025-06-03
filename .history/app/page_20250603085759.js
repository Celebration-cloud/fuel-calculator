import FuelCalculator from "@/components/FuelCalculator";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col transition-colors">
      <main className="flex flex-1 flex-col items-center justify-center py-12">
        <SignedIn>
          <FuelCalculator />
        </SignedIn>
        <SignedOut>
          <AuthModal />
        </SignedOut>
      </main>
    </div>
  );
}

import Head from "next/head";
import CalculatorForm from "@/components/CalculatorForm";
import AuthModal from "@/components/AuthModal";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function Home() {
  const { userId } = auth();
  // if (!userId) return <AuthModal />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100">
      <Head>
        <title>Fuel Cost Calculator</title>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
      </Head>
      {/* Auth Modal for users not signed in */}
      {/* <SignedOut>
        <AuthModal />
      </SignedOut> */}
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white/80 shadow-md">
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight">
          🚗 Fuel Cost Calculator
        </h1>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-xl">
          <CalculatorForm />
        </div>
      </main>
      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Fuel Calculator. All rights reserved.
      </footer>
    </div>
  );
}

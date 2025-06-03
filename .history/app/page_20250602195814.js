import Head from "next/head";
import CalculatorForm from "@/components/CalculatorForm";
import { auth } from "@clerk/nextjs/server";
export default function Home() {
  return (
    <>
      <Head>
        <title>Fuel Cost Calculator</title>
      </Head>
      <main className="min-h-screen bg-gray-100 p-8">
        <CalculatorForm />
      </main>
    </>
  );
}

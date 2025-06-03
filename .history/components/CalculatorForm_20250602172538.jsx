"use client";
import { useState } from "react";

// Fuel Calculator Form Component
export default function CalculatorForm() {
  // State for user inputs and calculated savings
  const [fuelCost, setFuelCost] = useState("");
  const [fuelUsage, setFuelUsage] = useState("");
  const [monthlySavings, setMonthlySavings] = useState(null);
  const [yearlySavings, setYearlySavings] = useState(null);

  // Calculate savings based on input values
  const calculateSavings = () => {
    const cost = parseFloat(fuelCost);
    const usage = parseFloat(fuelUsage);

    if (!cost || !usage) return;

    const petrolCost = usage * cost;
    const cngCost = petrolCost * 0.55; // assume 45% cheaper
    const savings = petrolCost - cngCost;

    setMonthlySavings(savings);
    setYearlySavings(savings * 12);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-black">
        Fuel Cost Calculator
      </h2>
      {/* Input for cost per liter */}
      <input
        className="border w-full p-2 mb-2 text-black"
        type="number"
        placeholder="Cost per liter (e.g. 650)"
        value={fuelCost}
        onChange={(e) => setFuelCost(e.target.value)}
      />
      {/* Input for liters used per month */}
      <input
        className="border w-full p-2 mb-2"
        type="number"
        placeholder="Liters used per month"
        value={fuelUsage}
        onChange={(e) => setFuelUsage(e.target.value)}
      />
      {/* Button to trigger calculation */}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        onClick={calculateSavings}
      >
        Calculate Savings
      </button>

      {/* Display savings if calculated */}
      {monthlySavings !== null && (
        <div className="mt-4">
          <p>💸 Monthly Savings: ₦{monthlySavings.toFixed(2)}</p>
          <p>📆 Yearly Savings: ₦{yearlySavings.toFixed(2)}</p>
          <a href="/signup" className="block mt-4 text-blue-600 underline">
            Sign up or learn more
          </a>
        </div>
      )}
    </div>
  );
}

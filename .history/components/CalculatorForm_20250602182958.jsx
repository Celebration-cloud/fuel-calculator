"use client";
import { useState } from "react";

// Helper to format currency with comma and ₦ sign
function formatNaira(amount) {
  if (amount === "" || amount === null) return "";
  return (
    "₦" + Number(amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })
  );
}

// Helper to remove non-numeric characters except dot
function parseNaira(input) {
  return input.replace(/[^0-9.]/g, "");
}

export default function CalculatorForm() {
  // Store raw values (not formatted)
  const [fuelCost, setFuelCost] = useState("");
  const [fuelUsage, setFuelUsage] = useState("");
  const [monthlySavings, setMonthlySavings] = useState(null);
  const [yearlySavings, setYearlySavings] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form submit and call API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fuelCost: Number(fuelCost),
        fuelUsage: Number(fuelUsage),
      }),
    });

    const data = await res.json();
    setMonthlySavings(data.monthlySavings);
    setYearlySavings(data.yearlySavings);
    setLoading(false);
  };

  // Handle input change and store only raw value
  const handleFuelCostChange = (e) => {
    const raw = parseNaira(e.target.value);
    setFuelCost(raw);
  };

  const handleFuelUsageChange = (e) => {
    const raw = parseNaira(e.target.value);
    setFuelUsage(raw);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-green-50 via-white to-blue-100 shadow-2xl rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 tracking-tight">
        🚗 Fuel Cost Calculator
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Input for cost per liter */}
        <div>
          <label
            htmlFor="fuelCost"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cost per liter <span className="text-gray-400">(e.g. 650)</span>
          </label>
          <input
            id="fuelCost"
            className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900 bg-white transition"
            type="text"
            inputMode="decimal"
            placeholder="₦0.00"
            value={fuelCost ? formatNaira(fuelCost) : ""}
            onChange={handleFuelCostChange}
            required
            // Prevent cursor jump by always putting it at the end
            onFocus={(e) => {
              // Move cursor to end on focus
              const val = e.target.value;
              e.target.value = "";
              e.target.value = val;
            }}
          />
        </div>
        {/* Input for liters used per month */}
        <div>
          <label
            htmlFor="fuelUsage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Liters used per month
          </label>
          <input
            id="fuelUsage"
            className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900 bg-white transition"
            type="text"
            inputMode="decimal"
            placeholder="₦0.00"
            value={fuelUsage ? formatNaira(fuelUsage) : ""}
            onChange={handleFuelUsageChange}
            required
            onFocus={(e) => {
              const val = e.target.value;
              e.target.value = "";
              e.target.value = val;
            }}
          />
        </div>
        {/* Button to trigger calculation */}
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg w-full shadow-lg transition"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate Savings"}
        </button>
      </form>

      {/* Display savings if calculated */}
      {monthlySavings !== null && (
        <div className="mt-8 bg-white/80 rounded-xl p-6 shadow-inner text-center">
          <p className="text-lg font-semibold text-green-700 mb-2">
            💸 Monthly Savings:{" "}
            <span className="font-mono">{formatNaira(monthlySavings)}</span>
          </p>
          <p className="text-lg font-semibold text-blue-700 mb-4">
            📆 Yearly Savings:{" "}
            <span className="font-mono">{formatNaira(yearlySavings)}</span>
          </p>
          <a
            href="/signup"
            className="inline-block mt-2 text-blue-600 hover:text-blue-800 underline font-medium transition"
          >
            Sign up or learn more
          </a>
        </div>
      )}
    </div>
  );
}
export const revalidate = 0; // Disable revalidation for instant updates
export const fetchCache = "force-no-store"; // Disable caching to always fetch fresh data

"use client";
import { useState } from "react";
import FuelChart from "./FuelChart";

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

export default function FuelCalculator() {
  const [fuelCost, setFuelCost] = useState("");
  const [fuelUsage, setFuelUsage] = useState("");
  const [monthlySavings, setMonthlySavings] = useState(null);
  const [yearlySavings, setYearlySavings] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const petrolCost = Number(fuelCost) * Number(fuelUsage);
    const cngCost = petrolCost * 0.55;

    setMonthlySavings(data.monthlySavings);
    setYearlySavings(data.yearlySavings);

    setChartData([
      {
        name: "Monthly",
        Petrol: petrolCost,
        CNG: cngCost,
        Savings: data.monthlySavings,
      },
      {
        name: "Yearly",
        Petrol: petrolCost * 12,
        CNG: cngCost * 12,
        Savings: data.yearlySavings,
      },
    ]);

    setLoading(false);
  };

  const handleFuelCostChange = (e) => {
    const raw = parseNaira(e.target.value);
    setFuelCost(raw);
  };

  const handleFuelUsageChange = (e) => {
    const raw = parseNaira(e.target.value);
    setFuelUsage(raw);
  };

  return (
    <div className="flex flex- max-[1000px]:flex-col gap-8 justify-evenly items-center w-full">
      {/* Form Section */}
      <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl max-md:text-xl max-sm:text-sm font-extrabold mb-6 text-center text-green-700 dark:text-green-300 tracking-tight">
          🚗 Fuel Cost Calculator
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="fuelCost"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Cost per liter <span className="text-gray-400">(e.g. 650)</span>
            </label>
            <input
              id="fuelCost"
              className="border border-gray-300 dark:border-gray-600 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 transition"
              type="text"
              inputMode="decimal"
              placeholder="₦0.00"
              value={fuelCost ? formatNaira(fuelCost) : ""}
              onChange={handleFuelCostChange}
              required
              onFocus={(e) => {
                const val = e.target.value;
                e.target.value = "";
                e.target.value = val;
              }}
            />
          </div>
          <div>
            <label
              htmlFor="fuelUsage"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Liters used per month
            </label>
            <input
              id="fuelUsage"
              className="border border-gray-300 dark:border-gray-600 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 transition"
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
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg w-full shadow-lg transition"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate Savings"}
          </button>
        </form>

        {monthlySavings !== null && (
          <div className="mt-8 bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 shadow-inner text-center">
            <p className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
              💸 Monthly Savings:{" "}
              <span className="font-mono">{formatNaira(monthlySavings)}</span>
            </p>
            <p className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-4">
              📆 Yearly Savings:{" "}
              <span className="font-mono">{formatNaira(yearlySavings)}</span>
            </p>
          </div>
        )}
      </div>

      {/* Chart Section */}
      <FuelChart chartData={chartData} />
    </div>
  );
}

export const revalidate = 0;
export const fetchCache = "force-no-store";

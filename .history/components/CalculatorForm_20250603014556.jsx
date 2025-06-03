"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function formatNaira(amount) {
  if (amount === "" || amount === null) return "";
  return (
    "₦" + Number(amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })
  );
}

function parseNaira(input) {
  return input.replace(/[^0-9.]/g, "");
}

export default function CalculatorForm() {
  const [fuelCost, setFuelCost] = useState("");
  const [fuelUsage, setFuelUsage] = useState("");
  const [monthlySavings, setMonthlySavings] = useState(null);
  const [yearlySavings, setYearlySavings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("fuel"); // 'fuel' or 'savings'

  const [fuelChartData, setFuelChartData] = useState([]);
  const [savingsChartData, setSavingsChartData] = useState([]);

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

    setFuelChartData([
      { name: "Fuel Cost", Petrol: petrolCost, CNG: cngCost },
    ]);
    setSavingsChartData([
      { name: "Savings", Monthly: data.monthlySavings, Yearly: data.yearlySavings },
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
    <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">🚗 Fuel Cost Calculator</h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm text-gray-700">Cost per liter (₦)</label>
          <input
            type="text"
            value={fuelCost ? formatNaira(fuelCost) : ""}
            onChange={handleFuelCostChange}
            inputMode="decimal"
            placeholder="₦0.00"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            onFocus={(e) => {
              const val = e.target.value;
              e.target.value = "";
              e.target.value = val;
            }}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-700">Liters used per month</label>
          <input
            type="text"
            value={fuelUsage ? formatNaira(fuelUsage) : ""}
            onChange={handleFuelUsageChange}
            inputMode="decimal"
            placeholder="₦0.00"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
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
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </form>

      {monthlySavings !== null && (
        <div className="mt-8">
          <div className="text-center">
            <p className="text-lg text-green-700 font-medium">💸 Monthly Savings: {formatNaira(monthlySavings)}</p>
            <p className="text-lg text-blue-700 font-medium">📆 Yearly Savings: {formatNaira(yearlySavings)}</p>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab("fuel")}
              className={`px-4 py-2 rounded-full font-medium ${
                activeTab === "fuel"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Fuel Cost Comparison
            </button>
            <button
              onClick={() => setActiveTab("savings")}
              className={`px-4 py-2 rounded-full font-medium ${
                activeTab === "savings"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Savings Overview
            </button>
          </div>

          {/* Chart Display */}
          <div className="mt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activeTab === "fuel" ? fuelChartData : savingsChartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => formatNaira(value)} />
                <Legend />
                {activeTab === "fuel" ? (
                  <>
                    <Bar dataKey="Petrol" fill="#ef4444" />
                    <Bar dataKey="CNG" fill="#10b981" />
                  </>
                ) : (
                  <>
                    <Bar dataKey="Monthly" fill="#3b82f6" />
                    <Bar dataKey="Yearly" fill="#8b5cf6" />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}


export const revalidate = 0; // Disable revalidation for instant updates
export const fetchCache = "force-no-store"; // Disable caching to always fetch fresh data

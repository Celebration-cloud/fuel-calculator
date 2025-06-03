"use client";
import { useState } from "react";
import FuelChart from "./FuelChart";
import FormSection from "./FormSection";

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
    <div className="flex flex-row max-[1000px]:flex-col gap-8 justify-evenly items-center w-full">
      {/* Form Section */}
      <FormSection
        fuelCost={fuelCost}
        fuelUsage={fuelUsage}
        monthlySavings={monthlySavings}
        yearlySavings={yearlySavings}
        loading={loading}
        handleSubmit={handleSubmit}
        handleFuelCostChange={handleFuelCostChange}
        handleFuelUsageChange={handleFuelUsageChange}
      />
      {/* Chart Section */}
      <FuelChart chartData={chartData} />
    </div>
  );
}

export const revalidate = 0;
export const fetchCache = "force-no-store";

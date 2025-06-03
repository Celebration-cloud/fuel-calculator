import { useState } from 'react';

export default function CalculatorForm() {
  const [fuelCost, setFuelCost] = useState('');
  const [fuelUsage, setFuelUsage] = useState('');
  const [monthlySavings, setMonthlySavings] = useState<number | null>(null);
  const [yearlySavings, setYearlySavings] = useState<number | null>(null);

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
      <h2 className="text-xl font-bold mb-4">Fuel Cost Calculator</h2>
      <input
        className="border w-full p-2 mb-2"
        type="number"
        placeholder="Cost per liter (e.g. 650)"
        value={fuelCost}
        onChange={(e) => setFuelCost(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-2"
        type="number"
        placeholder="Liters used per month"
        value={fuelUsage}
        onChange={(e) => setFuelUsage(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        onClick={calculateSavings}
      >
        Calculate Savings
      </button>

      {monthlySavings !== null && (
        <div className="mt-4">
          <p>💸 Monthly Savings: ₦{monthlySavings.toFixed(2)}</p>
          <p>📆 Yearly Savings: ₦{yearlySavings!.toFixed(2)}</p>
          <a href="/signup" className="block mt-4 text-blue-600 underline">
            Sign up or learn more
          </a>
        </div>
      )}
    </div>
  );
}

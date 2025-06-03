"use client";
// Helper to format currency with comma and ₦ sign
function formatNaira(amount) {
  if (amount === "" || amount === null) return "";
  return (
    "₦" + Number(amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })
  );
}

export default function FormSection({
  fuelCost,
  fuelUsage,
  monthlySavings,
  yearlySavings,
  loading,
  handleSubmit,
  handleFuelCostChange,
  handleFuelUsageChange,
}) {
  return (
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
  );
}

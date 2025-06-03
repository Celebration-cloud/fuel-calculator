"use client";
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

// Helper to format currency with comma and ₦ sign
function formatNaira(amount) {
  if (amount === "" || amount === null) return "";
  return (
    "₦" + Number(amount).toLocaleString("en-NG", { minimumFractionDigits: 2 })
  );
}

export default function FuelChart({ chartData }) {
  return (
    <div className="flex-1 w-full max-w-xl bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl border border-blue-100 dark:border-blue-900 p-6">
      <h3 className="text-xl font-bold mb-4 text-center text-blue-700 dark:text-blue-300">
        Cost & Savings Overview
      </h3>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="dark:stroke-[#334155]"
            />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              className="dark:stroke-blue-200"
            />
            <YAxis
              tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
              stroke="#64748b"
              className="dark:stroke-blue-200"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                color: "#222",
              }}
              wrapperClassName="dark:bg-gray-900 dark:text-gray-100"
              formatter={(val) => formatNaira(val)}
            />
            <Legend />
            <Bar dataKey="Petrol" fill="#ef4444" />
            <Bar dataKey="CNG" fill="#10b981" />
            <Bar dataKey="Savings" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

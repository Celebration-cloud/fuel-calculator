export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { fuelCost, fuelUsage } = req.body;

  if (!fuelCost || !fuelUsage) {
    return res.status(400).json({ message: "Missing fuel cost or usage" });
  }

  const petrolCost = fuelCost * fuelUsage;
  const cngCost = petrolCost * 0.55; // Assume 45% cheaper
  const savings = petrolCost - cngCost;

  return res.status(200).json({
    monthlySavings: parseFloat(savings.toFixed(2)),
    yearlySavings: parseFloat((savings * 12).toFixed(2)),
  });
}

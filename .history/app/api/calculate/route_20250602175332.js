export default function handler(req, res) {
  if (req.method === "POST") {
    const { fuelCost, fuelUsage } = req.body;

    // Validate input
    if (
      typeof fuelCost !== "number" ||
      typeof fuelUsage !== "number" ||
      isNaN(fuelCost) ||
      isNaN(fuelUsage)
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const petrolCost = fuelCost * fuelUsage;
    const cngCost = petrolCost * 0.55; // Assume 45% cheaper
    const monthlySavings = petrolCost - cngCost;
    const yearlySavings = monthlySavings * 12;

    return res.status(200).json({
      monthlySavings: Number(monthlySavings.toFixed(2)),
      yearlySavings: Number(yearlySavings.toFixed(2)),
    });
  }

  // Always send a response for non-POST requests
  res.status(405).json({ error: "Method not allowed" });
}
export const dynamic = "force-dynamic"; // Force dynamic rendering for real-time updates
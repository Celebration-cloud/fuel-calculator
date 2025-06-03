export default function handler(req, res) {
  if (req.method === "POST") {
    const { fuelSpend } = req.body;

    const cngEfficiency = 0.6; // 40% savings assumption
    const monthlySavings = Math.round(fuelSpend * cngEfficiency);
    const yearlySavings = monthlySavings * 12;

    return res.status(200).json({
      monthly: monthlySavings,
      yearly: yearlySavings,
    });
  }

  res.status(405).end(); // Method not allowed
}
export const dynamic = "force-dynamic"; // Force dynamic rendering for real-time updates
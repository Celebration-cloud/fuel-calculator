export async function POST(request) {
  try {
    const body = await request.json();
    const { fuelCost, fuelUsage } = body;

    // Validate input
    if (
      typeof fuelCost !== "number" ||
      typeof fuelUsage !== "number" ||
      isNaN(fuelCost) ||
      isNaN(fuelUsage)
    ) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const petrolCost = fuelCost * fuelUsage;
    const cngCost = petrolCost * 0.10; // Assume 45% cheaper
    const monthlySavings = petrolCost - cngCost;
    const yearlySavings = monthlySavings * 12;

    return new Response(
      JSON.stringify({
        monthlySavings: Number(monthlySavings.toFixed(2)),
        yearlySavings: Number(yearlySavings.toFixed(2)),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export const dynamic = "force-dynamic"; // Force dynamic rendering for real-time updates

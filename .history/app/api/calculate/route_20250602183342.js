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

    // Calculate savings
    const petrolCost = fuelCost * fuelUsage;
    const cngCost = petrolCost * 0.55; // Assume 45% cheaper
    const monthlySavings = petrolCost - cngCost;
    const yearlySavings = monthlySavings * 12;

    // Call Climatiq API for CNG emissions estimate
    const climatiqRes = await fetch(
      "https://api.climatiq.io/data/v1/estimate",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 4PZEPW855D05XB8BBYX84RF364",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emission_factor: {
            activity_id: "fuel-type_cng-fuel_use_na",
            source: "DISER",
            region: "AU",
            year: 2023,
            source_lca_activity: "fuel_combustion",
            data_version: "^0",
          },
          parameters: {
            energy: 1000, // You can replace this with a value based on fuelUsage if needed
            energy_unit: "kWh",
          },
        }),
      }
    );

    let climatiqData = null;
    if (climatiqRes.ok) {
      climatiqData = await climatiqRes.json();
    }

    cons
    return new Response(
      JSON.stringify({
        monthlySavings: Number(monthlySavings.toFixed(2)),
        yearlySavings: Number(yearlySavings.toFixed(2)),
        climatiq: climatiqData, // Include Climatiq API response
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

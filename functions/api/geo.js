export async function onRequestGet({ request }) {
  try {
    // Cloudflare Workers Runtime injeta dados de geolocalização automaticamente em request.cf
    const cf = request.cf || {};

    const geo = {
      city: cf.city || "Desconhecida",
      region: cf.region || "Desconhecida",
      country: cf.country || "Desconhecido",
    };

    return new Response(JSON.stringify(geo), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ city: "Desconhecida", region: "Desconhecida", country: "Desconhecido" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}

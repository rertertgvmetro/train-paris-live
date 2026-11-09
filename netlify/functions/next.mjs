
export default async (request) => {
  const key = process.env.PRIM_API_KEY;

  if (!key) {
    return new Response(
      JSON.stringify({ error: "La clé PRIM n'est pas configurée sur Netlify." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const url = new URL(request.url);
  const ref = url.searchParams.get("MonitoringRef");

  if (!ref) {
    return new Response(
      JSON.stringify({ error: "MonitoringRef manquant." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const apiUrl = new URL(
      "https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring"
    );
    apiUrl.searchParams.set("MonitoringRef", ref);

    const response = await fetch(apiUrl, {
      headers: { apiKey: key }
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la communication avec PRIM." }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
};

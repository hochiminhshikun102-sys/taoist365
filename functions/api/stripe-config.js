const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

export async function onRequestGet(context) {
  const publishableKey =
    context.env.STRIPE_PUBLISHABLE_KEY ||
    context.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "";

  if (!publishableKey) {
    return new Response(JSON.stringify({ error: "Stripe publishable key is not configured." }), {
      status: 500,
      headers: jsonHeaders,
    });
  }

  return new Response(JSON.stringify({ publishableKey }), { headers: jsonHeaders });
}

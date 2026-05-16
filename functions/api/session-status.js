const STRIPE_API_VERSION = "2026-04-22.dahlia";

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

export async function onRequestGet(context) {
  const secretKey = context.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return json({ error: "Stripe secret key is not configured." }, 500);
  }

  const url = new URL(context.request.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return json({ error: "Missing checkout session." }, 400);
  }

  const response = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=payment_intent`,
    {
      headers: {
        authorization: `Bearer ${secretKey}`,
        "stripe-version": STRIPE_API_VERSION,
      },
    },
  );
  const session = await response.json();

  if (!response.ok) {
    return json({ error: session?.error?.message || "Unable to retrieve checkout session." }, response.status);
  }

  return json({
    status: session.status,
    payment_status: session.payment_status,
    payment_intent_id: session.payment_intent?.id || null,
    payment_intent_status: session.payment_intent?.status || null,
  });
}

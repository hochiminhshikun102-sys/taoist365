const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

const LIVE_PUBLISHABLE_KEY = "pk_live_51TTn5jC2b4FFKE1qlUsTKcgstlXTqsZf9zBhbcJKJaV1PxlrIX4LcWnZ7vsDTNXYQcA6ZRzTaME0lp4gHFYFTlPd00BQwVEhuN";

export async function onRequestGet(context) {
  const publishableKey =
    context.env.STRIPE_PUBLISHABLE_KEY ||
    context.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    LIVE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return new Response(JSON.stringify({ error: "Stripe publishable key is not configured." }), {
      status: 500,
      headers: jsonHeaders,
    });
  }

  return new Response(JSON.stringify({ publishableKey }), { headers: jsonHeaders });
}

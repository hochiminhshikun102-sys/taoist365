const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

export async function onRequestGet(context) {
  return new Response(
    JSON.stringify({
      hasStripeSecretKey: Boolean(context.env?.STRIPE_SECRET_KEY),
      hasQuietAdminPhrase: Boolean(context.env?.NEXT_PUBLIC_QUIET_ADMIN_PHRASE),
      envKeyCount: Object.keys(context.env || {}).length,
    }),
    { headers: jsonHeaders },
  );
}

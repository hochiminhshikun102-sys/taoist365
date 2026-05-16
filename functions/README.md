## Velune Stripe sandbox checkout

Cloudflare Pages Functions provide the server side of the `/store` Stripe Elements checkout.

Required Cloudflare Pages environment variables:

- `STRIPE_SECRET_KEY`: Stripe test secret key, for example `sk_test_...`. Keep this only in Cloudflare.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: optional build-time override for the browser publishable key.

The storefront uses `/api/create-checkout-session` to create a Stripe Checkout Session in Elements mode, then `/api/session-status` to confirm the redirected session status.

# P0-01A environment variable names

Names only. Never commit real values, Access tokens, KV/R2 IDs, Stripe keys, or admin phrases.

| Name | Where | Purpose |
| --- | --- | --- |
| `DOHARA_RUNTIME_ENV` | Preview wrangler `vars` | Must be `preview` on this batch. |
| `DOHARA_PREVIEW_ISOLATION` | Preview wrangler `vars` | Must be `TRUE`. |
| `OBJECT_INTAKE_KV` | Cloudflare binding name | Preview namespace only. |
| `OBJECT_MEDIA_BUCKET` | Cloudflare binding name | Preview bucket `vl-object-media-preview` only. |
| `NEXT_PUBLIC_QUIET_ADMIN_PHRASE` | Preview vars | Preview-only phrase. Not production auth. |

Forbidden in this batch:

- Production KV namespace IDs
- Production R2 bucket `vl-object-media` as a writable target
- `STRIPE_SECRET_KEY` live values
- Access service tokens

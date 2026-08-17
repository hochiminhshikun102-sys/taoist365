# Auth helpers

Cloudflare Pages Functions verify identity in `functions/_auth/**` only.

Browser code in this batch:

- `src/lib/supabase/client.ts` — Preview publishable client only
- `src/lib/auth/preview-gate.js` — fail-closed Preview host + env marker
- `src/lib/auth/logout.js` — signOut must succeed and SDK session must be null
- `src/components/auth/PreviewAuthGate.tsx` — no children / no Auth init until gate passes
- `src/lib/auth/private-api.ts` — Bearer + one refresh retry
- `src/components/auth/AuthModal.tsx` — login surface
- Preview harness: `/preview/p0-00c`
- Magic-link return: `/auth/callback`

Do not authorize from email, `user_metadata`, or client-written roles.

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
- Magic-link / recovery / invite return: `/auth/callback`
- Reset `redirectTo` is `previewAuthCallbackUrl(origin)` → `{origin}/auth/callback`
- PKCE recovery emails arrive as `?code=` without `type=recovery`. Dashboard invite/recovery mails may arrive as implicit `#access_token&refresh_token&type=invite|recovery` or `token_hash`. Browser client sets `detectSessionInUrl: false`. Callback subscribes, then awaits `exchangeCodeForSession` / `setSession` / `verifyOtp`. After success it `history.replaceState`s away one-time params so a real refresh cannot re-consume them. `type` and an old Session cannot fake a new invite/recovery. Exceptions are caught, the error page is shown, and the subscription is always cleared.

Do not authorize from email, `user_metadata`, or client-written roles.

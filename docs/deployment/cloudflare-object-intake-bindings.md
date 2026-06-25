# Cloudflare Object Intake Bindings

This note locks the Cloudflare bindings needed by the VL Object Intake Pipeline MVP.

## Required Bindings

| Binding | Cloudflare type | Purpose |
| --- | --- | --- |
| `OBJECT_INTAKE_KV` | KV namespace | Stores object intakes, AI drafts, review queue, audit logs, and published object records. |
| `OBJECT_MEDIA_BUCKET` | R2 bucket | Stores uploaded original media and generated media variants. |

## Dashboard Setup

In Cloudflare Dashboard:

1. Open the VL Pages project.
2. Go to `Settings` -> `Bindings`.
3. Add a KV namespace binding:
   - Variable name: `OBJECT_INTAKE_KV`
   - Namespace: create or select the production object-intake namespace.
4. Add an R2 bucket binding:
   - Variable name: `OBJECT_MEDIA_BUCKET`
   - Bucket: `vl-object-media`
5. Go to `Settings` -> `Environment variables`.
6. Keep `NEXT_PUBLIC_QUIET_ADMIN_PHRASE` set only as a temporary preview gate.
7. Redeploy the latest production build after adding bindings.

For preview deployments, bind a separate KV namespace and R2 bucket when possible:

| Preview resource | Suggested name |
| --- | --- |
| KV namespace | `vl-object-intake-preview` |
| R2 bucket | `vl-object-media-preview` |

## Runtime Contract

The Pages Functions expect these bindings:

- `context.env.OBJECT_INTAKE_KV`
- `context.env.OBJECT_MEDIA_BUCKET`

If a binding is missing, the functions fall back to an in-memory preview store. That mode is only for local smoke testing. It is not a business data store and will lose data across runtime restarts.

## MVP Acceptance

After deploy, verify this sequence:

1. Open `/admin/object-intakes/new`.
2. Upload one object image and submit it through the pipeline.
3. Open `/admin/object-intakes`.
4. Approve the intake.
5. Publish the intake.
6. Confirm the response contains a formal `object_id`.
7. Open `/objects`.
8. Confirm the published object appears on the frontstage.
9. Open `/objects/{object_id}` and confirm the object detail renders.

The first production target is one real object entering the system, passing review, publishing, and becoming visible on the frontstage.

## Not Included In P0

These are intentionally reserved and should not block the first closed loop:

- Taobao/Tmall/1688/Etsy/Shopify scraping.
- Automatic third-party material downloads.
- Real AI image beautification.
- Real AI pricing or compliance judgment.
- Buyer settlement, deposit payment, order, logistics, and after-sale accounting.

For external links in P0, store only `source_url` and `source_platform`. Add crawler/downloader work only after the intake, review, and publish loop is stable.

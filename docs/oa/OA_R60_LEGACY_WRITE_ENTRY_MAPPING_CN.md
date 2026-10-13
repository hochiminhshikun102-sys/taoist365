# R60 Legacy write entry mapping

Audit date: 2026-10-14  
Product base: `b3b2409e84201f7035a5470a28466b86f80b92de`  
Single server policy: `functions/_publish-policy.js`  
SECOND_PUBLISH_POLICY_CREATED=FALSE

## Publish-critical entries (gated this round)

| Entry | Method | Bypass risk before R60 | R60 status |
| --- | --- | --- | --- |
| `functions/api/admin/object-intakes/[intakeId]/publish.js` | POST | Body/header actor claims + intake shape inferred official | **GATED** 401/403 ZERO_WRITE before store |
| `functions/api/admin/objects/[objectId].js` | PATCH | Could set `status=published` without policy | **GATED** publish authz |
| `functions/api/admin/object-intakes/[intakeId]/review.js` | PATCH | Approve/reject without identity | **GATED** review authz |
| `functions/api/object-intakes/[intakeId]/submit-review.js` | POST | Review queue write without identity | **GATED** mutate_intake authz |
| `functions/api/object-intakes.js` | POST | Create intake; `submitted_by` default admin-os | **GATED** mutate_intake; submitted_by is not identity |
| `functions/api/admin/object-intakes/from-existing-object.js` | POST | Legacy sample create | **GATED** |
| `functions/api/admin/object-intakes/batch-links.js` | POST | Batch create | **GATED** |
| `functions/api/object-intakes/[intakeId]/ai-draft.js` | POST | Draft write | **GATED** |
| `functions/api/object-intakes/[intakeId]/media.js` | POST | Media write | **GATED** |
| `functions/api/object-intakes/parse-link.js` | POST | Parse helper | **GATED** |
| `functions/api/admin/assets.js` | POST | Asset write | **GATED** |
| `functions/api/admin/air-engine/jobs/[jobId]/outputs.js` | POST | Output upload | **GATED** |
| `functions/api/admin/air-engine/jobs/[jobId].js` | PATCH | Job status write | **GATED** |
| `functions/api/admin/air-engine/jobs/[jobId]/slots.js` | PATCH | Slot write | **GATED** |

## Client / UI (cannot grant direct_publish)

| Entry | Status |
| --- | --- |
| `src/lib/publish-policy.ts` | Hint only; `can_direct_publish` always false |
| `src/components/object-intake/ObjectIntakeAdminQueue.tsx` | No fake official actor |
| `src/lib/oa-publish/bridge.ts` | Calls APIs only; server authz still required |
| `/admin/co/publish` UI | Does not authorize; OPEN if it posts without middleware-injected `context.data.serverAuth` in live Pages |

## Intentionally not publish policy (not object-intake publish)

| Entry | Status |
| --- | --- |
| `functions/api/orders.js` / checkout / stripe | NOT_APPLICABLE (commerce checkout, not object publish) |
| `functions/api/public/objects.js` | NOT_APPLICABLE (read) |
| `functions/api/object-media/[mediaId].js` | NOT_APPLICABLE (GET) |

## OPEN write-bypass entries

OPEN_COUNT=0  
OPEN_LIST=none  

All mapped object-intake / publish / review / media-write handlers now refuse missing/invalid identity with 401/403 ZERO_WRITE.  
Production JWT/session middleware that fills `context.data.serverAuth` is **DEFERRED** (see reuse mapping) and is not an ungated write entry: without it, handlers fail-closed 401.

LEGACY_WRITE_ENTRY_OPEN_COUNT=0  
LEGACY_WRITE_ENTRY_BYPASS_BLOCKED=TRUE

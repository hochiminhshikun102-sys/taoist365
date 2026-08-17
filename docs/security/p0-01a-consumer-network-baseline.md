# P0-01A consumer network request baseline

Captured from committed source at `cdc74ae` (`feat/admin-os-p0-01a-preview-baseline`).
This batch does **not** migrate consumers. The table is the before-state.

## External consumers that currently call Admin API

| Page | Component | Current request | Target after later batches |
| --- | --- | --- | --- |
| `/wind-seeker` | `src/components/wind-seeker/GlobalBuyerCenter.tsx` | `GET /api/admin/object-intakes?status=all&buyer_id=wind-seeker&submitted_by=wind-seeker` | `/api/wind-seeker/intakes` |
| `/wind-seeker/products` | `src/components/object-intake/WindSeekerProductsClient.tsx` | `GET /api/admin/object-intakes?status=all&buyer_id=wind-seeker&submitted_by=wind-seeker` | `/api/wind-seeker/products` |
| `/wind-seeker/products/detail` | `src/components/object-intake/IntakeStatusDetailClient.tsx` | `GET /api/admin/object-intakes?intake_id=` | `/api/wind-seeker/products/{id}` |
| `/account/windkeep-supply/detail` | `src/components/object-intake/IntakeStatusDetailClient.tsx` | `GET /api/admin/object-intakes?intake_id=` | `/api/account/windkeep-supplies/{id}` |

Hardcoded client identities in current code (not server sessions):

- Wind Seeker: `buyer_id` / `submitted_by` = `wind-seeker`
- Member supply create path: `submitted_by=member-center`, `member_id=member-preview` via `POST /api/object-intakes` (not Admin API)

## Related non-admin writes (same KV store, not migrated this batch)

| Component | Request |
| --- | --- |
| `WindSeekerUploadClient.tsx` | `POST /api/object-intakes/parse-link`, `POST /api/object-intakes`, media, ai-draft, submit-review |
| `MemberWindkeepSupplyClient.tsx` | `POST /api/object-intakes` |

## Admin-only callers (must remain Admin API; later batches add auth)

| Component | Request |
| --- | --- |
| `ObjectIntakeAdminQueue.tsx` | GET/PATCH/POST `/api/admin/object-intakes...` |
| `ObjectIntakeBatchLinkImport.tsx` | `POST /api/admin/object-intakes/batch-links` |
| `LegacyProductSampleTest.tsx` | `POST /api/admin/object-intakes/from-existing-object` |
| `PublishedObjectsAdmin.tsx` | `/api/admin/objects` |
| `OrderAdminQueue.tsx` | `/api/admin/orders` |
| `AssetRegistryAdmin.tsx` | `POST /api/admin/assets` |
| `AirEngineJobQueue.tsx` | `/api/admin/air-engine/jobs...` |

## P0-01A freeze

Do not change these fetch URLs in this batch. Directly locking `/api/admin/object-intakes` would break the four external pages above.

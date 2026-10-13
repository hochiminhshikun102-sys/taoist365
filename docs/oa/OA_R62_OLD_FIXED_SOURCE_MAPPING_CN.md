# R62/R64 旧成果固定来源映射

标注：`CODE_MIGRATED` = 产品仓可点击代码已承接；`CONCEPT_REUSED` = 规则复用、代码未迁入；`DEFERRED` / `OPEN` = 明确未迁入；`NOT_CONFIRMED` = 查不到固定 SHA / 固定链接；`NOT_APPLICABLE` = 本线不要求迁入。

概念复用不得写成代码迁入。未迁入本轮不补迁，只如实标注。

仓库固定链接前缀：`https://github.com/hochiminhshikun102-sys/taoist365/commit/`

| 旧来源名称 | 旧来源完整 SHA | 旧来源路径 / 固定链接 | 当前是否迁入 | 当前保留位置 | 当前状态 | 后续 Owner | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Work 共用身份 / 权限公共层 | NOT_CONFIRMED | NOT_CONFIRMED（Work 仓身份中间件本体未在产品 git 中定位到固定 SHA） | 否（仅接入点） | `functions/_publish-policy.js` `readServerVerifiedIdentity` / `context.data.serverAuth` | CONCEPT_REUSED | Plus / Work | JWT/session 本体未迁入 |
| P0-00B 身份门禁 | NOT_CONFIRMED | NOT_CONFIRMED | 否 | 401 missing/invalid/expired 行为在 `_publish-policy.js` `assertActionAuthz` | CONCEPT_REUSED | Plus / Work | Cloudflare Access / JWT 验签 DEFERRED |
| P0-00C fail-closed | NOT_CONFIRMED | NOT_CONFIRMED | 否 | 未授权 403 + `write:false` / `zero_write` | CONCEPT_REUSED | Plus / Work | 正式主体撤销校验 DEFERRED |
| 旧 KV helper | `7b99c41ed707f634dd0efbaac49bb5622f0d77dc` | https://github.com/hochiminhshikun102-sys/taoist365/commit/7b99c41ed707f634dd0efbaac49bb5622f0d77dc ；`functions/_object-intake.js` `OBJECT_INTAKE_KV` | 是 | `functions/_object-intake.js` | CODE_MIGRATED | Product / Dogdan | MVP 引入；后续修订不另造 store |
| 旧 R2 / 媒体桶 helper | `7b99c41ed707f634dd0efbaac49bb5622f0d77dc` | https://github.com/hochiminhshikun102-sys/taoist365/commit/7b99c41ed707f634dd0efbaac49bb5622f0d77dc ；`OBJECT_MEDIA_BUCKET` | 是 | media / assets handlers | CODE_MIGRATED | Product / Dogdan | 本单未改绑定 |
| 持久上传 | `7b99c41ed707f634dd0efbaac49bb5622f0d77dc` | `functions/api/object-intakes/[intakeId]/media.js` `functions/api/admin/assets.js` | 是 | 同上 | CODE_MIGRATED | Product / Dogdan | 保持 |
| 旧 D1 reservation | NOT_CONFIRMED | NOT_CONFIRMED | 否 | 产品仓无 D1 schema / binding 迁入 | DEFERRED / OPEN | Plus / Work | 不得用概念复用冒充代码迁入 |
| UNKNOWN 纯查 | NOT_CONFIRMED | NOT_CONFIRMED | 否 | 本线未迁查询回填引擎 | NOT_APPLICABLE | Plus / Work | 不重做 |
| 查询回填 | NOT_CONFIRMED | NOT_CONFIRMED | 否 | — | NOT_APPLICABLE | Plus / Work | 本单未改 |
| 幂等恢复 | NOT_CONFIRMED | NOT_CONFIRMED | 否 | — | NOT_APPLICABLE | Plus / Work | 本单未改 |
| CAS 恢复 | NOT_CONFIRMED | NOT_CONFIRMED | 否 | 当前 KV `updateStore` 非 CAS | DEFERRED / OPEN | Plus / Work | 未迁入 |
| 审计恢复 | NOT_CONFIRMED | `functions/_object-intake.js` `createAuditLog` | 部分 | actor=`sub` 或 `DEFERRED_NO_TRUSTED_SUB` | CONCEPT_REUSED | Plus / Work | 审计 helper 在仓；恢复包本体 SHA 未确认 |
| Product Intake / object-intake 运行层 | `7b99c41ed707f634dd0efbaac49bb5622f0d77dc` | https://github.com/hochiminhshikun102-sys/taoist365/commit/7b99c41ed707f634dd0efbaac49bb5622f0d77dc ；`functions/api/object-intakes*` | 是 | 运行层 handlers | CODE_MIGRATED | Product / Dogdan | R64 只收紧官方来源绑定 |
| PR #8 server publish policy | `579947efaf59748664a3ecd4ef973f3d0fa50201` | https://github.com/hochiminhshikun102-sys/taoist365/commit/579947efaf59748664a3ecd4ef973f3d0fa50201 ；`functions/_publish-policy.js` | 是 | 仍唯一策略 | CODE_MIGRATED | Product | 不造第二套 |
| PR #9 Payments/Shipping 只读骨架 | `d19a0917b107d5c05061b47ec0b5ad6830a3064d` | https://github.com/hochiminhshikun102-sys/taoist365/commit/d19a0917b107d5c05061b47ec0b5ad6830a3064d ；`/admin/oa/co/*` | 是 | OA 只读路由 | CODE_MIGRATED | Product | 结构保留 |
| PR #10 CO runtime readonly | `ddbf1ad1fcffeffc7211b9cd42e77c65bdcf29c0` | https://github.com/hochiminhshikun102-sys/taoist365/commit/ddbf1ad1fcffeffc7211b9cd42e77c65bdcf29c0 | 是 | `/admin/oa/co/*` | CODE_MIGRATED | Product | 结构保留 |
| PR #11 Finance/Logistics/Supply 投影 | `b649b87b0a0f025ce804932e0853fac65cf72771` | https://github.com/hochiminhshikun102-sys/taoist365/commit/b649b87b0a0f025ce804932e0853fac65cf72771 | 是 | OA 投影页 | CODE_MIGRATED | Product | 结构保留 |
| PR #12 CS/Compliance/Overview 投影 | `f265a7806630e70a44ab776e07959f32a122feba` | https://github.com/hochiminhshikun102-sys/taoist365/commit/f265a7806630e70a44ab776e07959f32a122feba | 是 | OA 投影页 | CODE_MIGRATED | Product | 结构保留 |
| PR #13 Operations 只读 | `c1a5c4b89332df9fc4e4e3ef357fbd509e13ee88` | https://github.com/hochiminhshikun102-sys/taoist365/commit/c1a5c4b89332df9fc4e4e3ef357fbd509e13ee88 | 是 | `/admin/oa/operations` | CODE_MIGRATED | Product | 结构保留 |
| PR #14 AI Ops 只读 | `8f6e2bf710ec4255a9581e9a41a3c9a06e1f85b0` | https://github.com/hochiminhshikun102-sys/taoist365/commit/8f6e2bf710ec4255a9581e9a41a3c9a06e1f85b0 | 是 | `/admin/oa/ai-ops` | CODE_MIGRATED | Product | 结构保留 |
| PR #15 Site + GEO 只读 | `b3b2409e84201f7035a5470a28466b86f80b92de` | https://github.com/hochiminhshikun102-sys/taoist365/commit/b3b2409e84201f7035a5470a28466b86f80b92de | 是 | `/admin/oa/site` `/admin/oa/geo` | CODE_MIGRATED | Product | 结构保留 |
| PR #16 R60/R61 身份 401/403 | `72c288aee963762d0647a95f200ec7cb16cabea6` | https://github.com/hochiminhshikun102-sys/taoist365/commit/72c288aee963762d0647a95f200ec7cb16cabea6 | 是 | `_publish-policy.js` + handler tests | CODE_MIGRATED | Product | 身份门保留 |
| PR #17 R62 来源绑定 / 归属 / PATCH 门 | `58357d1e92a165055a5dc2c40c3b3422a180eccd` | https://github.com/hochiminhshikun102-sys/taoist365/commit/58357d1e92a165055a5dc2c40c3b3422a180eccd | 是 | bind/ownership/object PATCH | CODE_MIGRATED | Product | R64 在其上修官方来源洗白 |

NODE01_STRUCTURE_RESULTS_PRESERVED=TRUE  
SECOND_PUBLISH_POLICY_CREATED=FALSE  
EMPTY_SOURCE_DEFAULT=official + absent/empty source_type => `admin_upload` + `empty_source_default=true`（与非空 unknown 拒绝分开）

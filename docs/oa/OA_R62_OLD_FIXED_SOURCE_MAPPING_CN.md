# R62 旧成果固定来源映射

标注：`CODE_MIGRATED` = 当前仓可点击代码/文档路径已承接；`CONCEPT_REUSED` = 规则复用但代码未迁入；`DEFERRED` / `OPEN` = 未迁入。

| 旧来源 | 当前是否迁入 | 保留位置 | 后续责任 |
| --- | --- | --- | --- |
| Work 共用身份 / 权限公共层 | CONCEPT_REUSED | `functions/_publish-policy.js` `context.data.serverAuth` 接入点；JWT 校验本体未迁入 | Plus / Work：正式 session 中间件 |
| P0-00B / P0-00C 身份门禁与 fail-closed | CONCEPT_REUSED | 401 missing/invalid/expired；403 unauthorized；ZERO_WRITE | 正式 JWT 验签 DEFERRED |
| 旧 KV helper | CODE_MIGRATED | `functions/_object-intake.js` `OBJECT_INTAKE_KV` | 保持，不另造 store |
| 旧 R2 / 媒体桶 helper | CODE_MIGRATED | `OBJECT_MEDIA_BUCKET` in media/assets handlers | 保持 |
| 持久上传成果 | CODE_MIGRATED | `functions/api/object-intakes/[intakeId]/media.js` `functions/api/admin/assets.js` | 保持 |
| UNKNOWN 纯查 / 查询回填 / 幂等恢复 | NOT_APPLICABLE | 本单未改查询回填 | 不重做 |
| CAS 和审计恢复 | CONCEPT_REUSED | `createAuditLog`；actor 现为 `sub` 或 `DEFERRED_NO_TRUSTED_SUB` | 正式主体接线后替换 deferred |
| D1 reservation | DEFERRED / OPEN | 未迁入产品仓 | 不得用概念复用冒充代码迁入 |
| Product Intake / object-intake 运行层 | CODE_MIGRATED | `functions/api/object-intakes*` `functions/_object-intake.js` | R62 只加绑定/归属/发布门 |
| PR #8 server publish policy | CODE_MIGRATED | `functions/_publish-policy.js`（仍唯一策略） | 不造第二套 |
| PR #9–#15 OA 只读结构 | CODE_MIGRATED | `/admin/oa/*` 路由与组件 | 本单不重建 |
| PR #16 R60/R61 身份 401/403 | CODE_MIGRATED | 同上 policy + publish handler tests | R62 收紧权限与归属 |

NODE01_STRUCTURE_RESULTS_PRESERVED=TRUE  
SECOND_PUBLISH_POLICY_CREATED=FALSE

扩围（非结构重建，回执列出）：后台专用写入口改为 `enforceOfficialAction`（动作权限 + 官方身份）：
`functions/api/admin/object-intakes/from-existing-object.js`、`batch-links.js`、`assets.js` POST、`air-engine/jobs/[jobId].js` 及 slots/outputs、`review.js`、`publish.js`。

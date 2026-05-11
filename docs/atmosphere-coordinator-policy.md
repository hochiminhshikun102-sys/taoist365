# Atmosphere coordinator policy（气氛协调策略）

## Canonical

Shipped 站点为 **静态导出 + 浏览器侧 `useWorldRuntime()`**。服务端 **`coordinateGuidanceAtmosphere`**（`src/server/ai-pipeline/atmosphere-coordinator.ts`）仅描述 **安静 guidance 合成路径**，不以「运营编排 / 留存引擎 / 个性化漏斗」为产品真理。

## Naming discipline

- **Continuity** replaces legacy «retention» in engine IDs — visitor-facing 仍禁止绑架式 continuity 话术（见 `project-brain/softness-without-extraction/`）。
- **Environmental adaptation** replaces legacy «personalization» in engine IDs — 指语气尺度与环境默认值，不做用户画像增长。

## Related

- `docs/project-brain/runtime-hierarchy.md`
- `docs/project-brain/governance-priority-system.md`
- `docs/project-brain/softness-without-extraction/softness-without-extraction.md`
- `docs/project-brain/runtime-equilibrium/`

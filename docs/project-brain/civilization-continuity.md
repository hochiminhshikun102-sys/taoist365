# Civilization continuity（文明连续性）

## 快速对齐

- **连续性（continuity）** 指：**同一个 URL / 同一套 room grammar（房间语法）** 在年与季度的尺度上仍可辨认—靠的是 deterministic world-age（世界年龄）、sediment（沉积）与 thinning，而不是 **user memory profile（用户记忆画像）**。
- `civilization-continuity-infrastructure` 描述「世界记住自己的节律」，而不是「站点记住你是谁」。

## 本文件定义什么

支撑「五年后仍像同一个地方」：**world identity stability（世界身份稳定）**、`quiet-world-memory`（安静的世界残余—非账号记忆）、**ambient continuity（环境连续性）**。

## 核心原则

1. **No personalization**：连续性来自共享日键与世界状态，不来自 per-user store。
2. **低戏剧**：拒绝 archive theater（档案戏剧）、拒绝「你回来了」式 continuity theater。
3. **与 infra pass 的关系**：连续性越长，越需要 **`invisibleInfrastructureStructuralThinning`** 防止 prose stack（文案堆叠）膨胀。

## 代码锚点

- `src/data/civilization-continuity-infrastructure/*` — `resolveCivilizationContinuityInfrastructureBundle()`
- 姊妹文档：`civilization-continuity-principles.md`

## 维护提示

- 若连续性文案开始像 onboarding（引导教程），撤回 bundle，改成阈值层改动。

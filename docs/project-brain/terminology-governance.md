# Terminology governance（术语治理）

## QUICK CONTEXT BOOTSTRAP

本文件是 **`civilizationStabilizedStructuralThinning`** 与 **`invisibleInfrastructureStructuralThinning`** 的 **canonical single source of truth（唯一口径）**：避免 mixed-layer language（混层表述）、避免 runtime inheritance ambiguity（继承歧义）、避免组件误读中间层。

## Canonical definitions（ canonical 定义）

### `civilizationStabilizedStructuralThinning`

- **Role**: **intermediate civilization stabilization layer**（中间文明稳定层）输出的 numeric **`StructuralThinningPass`**。
- **Also described as**: **transitional stabilization pass**（过渡稳定 pass）；**non-final atmosphere layer**（非最终氛围层）—仅存在于数据解析链，**不得**作为 UI 氛围的最终依据。
- **Consumption**: **only** by **`world-ai-native-infrastructure-layer`**，用于叠化出最终 pass。

### `invisibleInfrastructureStructuralThinning`

- **Role**: **final atmosphere thinning read**（最终氛围变薄读数）—全站 UI 与文案闸门的**唯一**终端 thinning 字段。
- **Alias in prose**: **final invisible infrastructure pass**；**UI-effective structural thinning**。
- **Consumption**: **all** page components that gate Daily / Guidance / Mail / Objects / Home maturity strips **must** read **`worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning`** only.

## Prohibited wording patterns（禁止表述）

- 称 **`civilizationStabilizedStructuralThinning`** 为「UI 最终」「组件读取的最终变薄」— **false**。
- 在同一段落混用「文明层最终」与「基础设施层最终」而不标明层级 — **avoid**。
- 暗示 UI 「继承」文明层 pass 作为 override — **false**；UI **只继承**基础设施层终端字段。

## UI tone guardrails（界面语气护栏）

文档与代码注释均应避免把治理写成宣言：最终界面应更 **quiet（安静）**、**invisible（不可见）**、**room-like（房间感）**、**browser-native（浏览器原生感）**、**naturally existing（自然存在）** — 而非 **manifesto-like / conceptual / systemic / AI-product-shaped / governance-heavy**。

## Related docs

- `runtime-systems.md` §25–§26、`runtime-hierarchy.md`、`invisible-infrastructure.md`、`governance-priority-system.md`

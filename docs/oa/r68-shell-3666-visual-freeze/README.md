# R68｜OA Shell 3666 Visual Freeze

把 `http://localhost:3666` 老板认可的最新公共 Shell 视觉收成可追踪冻结对象。  
不是脏工作区口头现场，不是旧 `93201cd`。

VISUAL_CONFIRMATION_PASSED=FALSE（交 Plus 发财复核）。

## 冻结对象

- 分支：`dogdan/oa-r68-shell-3666-visual-freeze-20261014`
- 基线 master：`bf83dc4e8f1ceeaabfc4d2788271c40bc04d9817`
- 旧 freeze：`93201cdb12249f70c4356fe999843afdf4174417`
- 本分支从 `93201cd` 长出，只叠加 3666 视觉 Shell 文件 + 本目录说明/截图。

04 应改消费本 freeze 的公共 Shell，不要继续在 `93201cd` 上修发布内容皮肤。

## 公共 Shell（04 只读消费）

见 `BLOBS.txt`。路径：

- `src/components/oa-shell/OaSharedShell.tsx`
- `src/components/oa-shell/oaNavCanonical.ts`
- `src/components/oa-shell/useOaUiLocale.ts`
- `src/components/oa-shell/OaLoc.tsx`（可选）
- `src/styles/oa/oa-shell.css`
- `src/styles/oa/oa-tokens.css`

Header / Sidebar / Flyout / Drawer 仍在同一 `OaSharedShell.tsx`：`.oa-topbar` `.oa-rail` `.oa-floating-panel` `.oa-drawer`（mobile `is-open`）。

## 语言

- storage：`dohara.oa.language`
- event：`dohara-oa-language`
- `useOaUiLocale` / `oaPick` / `oaSplitMixed`
- 导航单语
- chip token：`read_only` / `not_connected` / `deploy disabled`

## 内容槽

`/admin/oa/co/intake` 父链未改。04 只换 `OaSharedShell activeKey="co"` 的 children。本 freeze **未改** intake page 与 `oa-publish/**`。

## 截图

目录：`screenshots/`。工具视口会裁右侧；chip 完整度见 390 顶栏。

| 文件 | 状态 |
| --- | --- |
| `zh-pc1440-overview.png` | 中文 PC 总览 |
| `en-pc1440-overview.png` | 英文 PC 总览 |
| `zh-pc1440-intake.png` | 中文 PC intake（仅验证 Shell 包裹） |
| `en-pc1440-intake.png` | 英文 PC intake |
| `zh-pc1440-co-flyout.png` | 中文 CO 浮层 |
| `en-pc1440-co-flyout.png` | 英文 CO 浮层 |
| `zh-pc1440-operations-flyout.png` | 中文 Operations 浮层 |
| `en-pc1440-operations-flyout.png` | 英文 Operations 浮层 |
| `en-m390-drawer.png` | 英文 390 抽屉（chip 三枚可见） |
| `en-m390-co-panel.png` | 英文 390 CO 子面板 |
| `zh-m390-co-panel.png` | 中文 390 CO 子面板 |
| `zh-m390-drawer.png` | 中文 390；有一次捕获未稳住抽屉层，以 `zh-m390-co-panel` 为准 |

浮层截图用 caret，不是 CDP hover。

## 禁止

不改 04 发布内容、不改 `969e8ac`、不接 Provider、不 deploy、不开 PR、不 merge。R67 clean PR 继续暂停。

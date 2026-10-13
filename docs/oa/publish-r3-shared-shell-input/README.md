# OA Publish R3｜公共 Shell 固定输入（狗蛋 → 地瓜04）

续单引用（协作仓，本产品树内无同名 md）：  
`tasks/OA-W01-COMMERCE-FULFILLMENT/OA_PUBLISH_R3_UNIFIED_SHELL_AND_LEGACY_CLOSEOUT_CN.md`  
`commit=303cccbd74f573e514a727fb564d7703e594d4d6`  
`NOT_IN_PRODUCT_TREE=TRUE`

本包只移交 `/admin/oa/co/intake` 可消费的公共 Shell。不重复搭商品发布，不进入 04 内容层。  
不开 PR / 不 merge / 不 deploy / 不接 Provider。

VISUAL_CONFIRMATION_PASSED=FALSE（Shell 视觉另见 R66B 包）。

---

## 1. 当前产品完整 SHA / 树状态

| 项 | 值 |
| --- | --- |
| PRODUCT_BRANCH | `dogdan/oa-shared-shell-nav-ux-polish-r66-20261014` |
| PRODUCT_MASTER | `bf83dc4e8f1ceeaabfc4d2788271c40bc04d9817`（未 merge Shell） |
| PRODUCT_HEAD（已推送 tip） | docs tip `10d8493`；**冻结源码对象** `93201cdb12249f70c4356fe999843afdf4174417` |
| 3666 现场 | `http://localhost:3666/admin/oa/co/intake`（进程在听；服务工作区脏树，**不是**冻结 HEAD） |
| 固定回执 | `docs/oa/publish-r3-shared-shell-input/RECEIPT.txt` |
| 语言修正提交 | `f0c6ce20974203255bb26200ce785d59d485e589` |
| R66 主候选 | `5f9df3488b9f980319cf0b8f887254db08a3b895` |
| PRODUCT_BASE | `bf83dc4e8f1ceeaabfc4d2788271c40bc04d9817` |
| R66B 确认包 | `docs/oa/r66b-visual-confirm/` @ `93201cd` |
| 工作区脏树 | TRUE（见第 10 节，**不得冒充冻结对象**） |

冻结对象一律用 `git cat-file blob <sha>` 对 `93201cd`。工作区补丁见 `patches/`。Plus 机读回执：`RECEIPT.txt`。

---

## 2. Shell 及布局组件（路径 + blob）

均为 `PRODUCT_HEAD` 冻结 blob。工作区若不同，见表右列 WT，**不以 WT 为冻结**。

| 路径 | HEAD blob | WT blob | 冻结？ |
| --- | --- | --- | --- |
| `src/components/oa-shell/OaSharedShell.tsx` | `3bcae3ff168b57836ff8e4015d11e1c6ede46058` | `f264b98e7a1a08dee45866b9b8ab9524a3d0a8ab` | HEAD only |
| `src/components/oa-shell/oaNavCanonical.ts` | `22c4ae2dd29b52f1cc5db89dd85309f386a21ba4` | `36f365b38140ba84572bebfe9e6d6cc2eedaf9e4` | HEAD only |
| `src/components/oa-skeleton/primaryEntries.ts` | `d41d751be290b2608105ebee106637762851ba30` | 同 HEAD | YES |
| `src/app/layout.tsx` | `c72ac4264a9cafd3125d8e84baaf0e3e7f0ce4bc` | 同 HEAD | YES |
| `src/app/admin/layout.tsx` | `b37a728f4aa34f65756c3278c7bdcad3c3348ebd` | 同 HEAD | YES |
| `src/app/admin/oa/layout.tsx` | `37849b7d132d0b79e12936ac59e7c983e0201954` | 同 HEAD | YES |

`OaSharedShell` 消费接口：

```ts
export function OaSharedShell({ activeKey = "overview", children }: { activeKey?: string; children: ReactNode })
```

intake 固定 `activeKey="co"`。

---

## 3. 样式入口（路径 + blob）

| 路径 | HEAD blob | WT blob | 冻结？ |
| --- | --- | --- | --- |
| `src/app/admin/oa/layout.tsx`（样式聚合入口） | `37849b7d132d0b79e12936ac59e7c983e0201954` | 同 HEAD | YES |
| `src/styles/oa/oa-tokens.css` | `d8df65b723a9b2340e4b01ad9c8dce0dccef456d` | `48b64f997b38f795a632003fdc46fcf64741d0a7` | HEAD only |
| `src/styles/oa/oa-shell.css` | `1ddf78347ba9fc75ac7459a1a458be332bd58671` | `63030b5f069f196c551d11295017b3c43e20113f` | HEAD only |
| `src/styles/oa/oa-skeleton.css` | `31ba5a25f86144ffb78f4aac06e53f3008030083` | 同 HEAD | YES |

`oa-shell.css` 首行 `@import "./oa-tokens.css"`。  
layout 还并列导入其余 OA 模块 CSS；地瓜04 **只读消费，不得改 layout 导入表、不得另造侧栏样式**。

获准使用的内容槽 class（只读）：`.oa-page` `.oa-page-title` `.oa-card` `.oa-btn` `.oa-btn.secondary`。

---

## 4. 语言组件 / 语言消费 API（路径 + blob）

| 路径 | HEAD blob | WT blob | 冻结？ |
| --- | --- | --- | --- |
| `src/components/oa-shell/useOaUiLocale.ts` | `6da55a33e450b85a8f0b8c39fc2d4b6337614d43` | `4b34c9dd31950a443b26e2e461deaf7c063d43f7` | HEAD only |
| `src/components/oa-shell/OaLoc.tsx` | **不在 HEAD** | `b2afdd7895ca8e33d3c259f8cf67a6454b5be131` | 否，见补丁 |

HEAD 已冻结的语言 API（`useOaUiLocale.ts`）：

```ts
export const OA_LANGUAGE_STORAGE_KEY = "dohara.oa.language";
export const OA_LANGUAGE_EVENT = "dohara-oa-language";
export type OaUiLocale = "zh-CN" | "en";
export function oaPick(locale: OaUiLocale, zh: string, en: string): string
export function oaSplitMixed(text: string, locale: OaUiLocale): string
export function useOaUiLocale(): { locale: OaUiLocale; setLocale: (next: OaUiLocale) => void; isZh: boolean }
```

与既有 Publish 语言开关同一 storage key。内容层只消费，不另开 key。  
`OaLoc` 为工作区未提交文件，**不是冻结对象**；04 可用 `useOaUiLocale` + `oaPick` 等价实现，或等狗蛋冻结后再用。

---

## 5. `/admin/oa/co/intake` 入口父布局链

实际链（无 `co/layout.tsx`）：

1. `src/app/layout.tsx` — html/body + `TemporalBandRoot`
2. `src/app/admin/layout.tsx` — 透传 children
3. `src/app/admin/oa/layout.tsx` — 导入 OA CSS，透传 children
4. `src/app/admin/oa/co/intake/page.tsx` HEAD=`0dddd70e1ebf14d08f8ea2fe312ac35e2f510367`（WT 相同，**冻结**）

page 现态：

```tsx
<OaSharedShell activeKey="co">
  <CoSecondaryWorkbench workbenchId="intake" />
</OaSharedShell>
```

---

## 6. 内容插槽说明

- **槽位**：`OaSharedShell` 的 `children`。渲染在 `.oa-main`。
- **04 接法**：保留 `OaSharedShell activeKey="co"`，把 `CoSecondaryWorkbench` **整段替换**为发布内容。不要包第二套侧栏/顶栏。
- **不要改**：`.oa-topbar` `.oa-rail` `.oa-floating-panel` 及 14 一级模块。
- 现槽内 `CoSecondaryWorkbench` 仅为骨架占位；替换后不再依赖其 UI。
- 现占位含 legacy 链到 `/admin/product-intake` `/admin/co/publish` `/admin/publish-review`。04 接内容后自行决定是否保留跳转；**不得改那三处内容层实现**。

---

## 7. 获准只读依赖闭包

地瓜04 **只读 import / 只读 CSS 变量**，不得改这些文件：

- `src/components/oa-shell/OaSharedShell.tsx`
- `src/components/oa-shell/oaNavCanonical.ts`
- `src/components/oa-shell/useOaUiLocale.ts`
- `src/components/oa-skeleton/primaryEntries.ts`（Shell 导航路径表）
- `src/styles/oa/oa-shell.css`
- `src/styles/oa/oa-tokens.css`
- `src/styles/oa/oa-skeleton.css`（可选 class）
- `src/app/admin/oa/layout.tsx`
- `src/app/admin/layout.tsx`
- `src/app/layout.tsx`

禁止新增第二套 Shell。禁止改 Cloudflare / env / binding。禁止接 Provider。

---

## 8. `/admin/oa/co/intake` 入口写锁移交

| 路径 | 写锁 |
| --- | --- |
| `src/app/admin/oa/co/intake/page.tsx` | **移交 04**：仅允许替换 `OaSharedShell` 的 children 为发布内容；必须保留 `OaSharedShell activeKey="co"` |
| `src/components/oa-shell/**` | **狗蛋 / Plus**：04 不得写 |
| `src/styles/oa/oa-shell.css` `oa-tokens.css` | **狗蛋 / Plus** |
| `src/app/admin/oa/layout.tsx` | **狗蛋 / Plus** |
| `src/components/oa-publish/Publish.tsx` | **04 内容层，狗蛋不得改** |
| `src/components/oa-publish/publish.module.css` | **04，狗蛋不得改** |
| `src/components/oa-publish/copy.ts` | **04，狗蛋不得改** |
| `src/lib/oa-publish/bridge.ts` | **04，狗蛋不得改** |
| `operation-journal.ts` | 本产品树 **无此文件**；若 04 仓有，狗蛋仍不得改 |

狗蛋已停手：不进入 04 商品发布内容层，不改商品发布 27 路径。

---

## 9. 维护边界

**狗蛋继续维护**

- 14 一级导航与 hover/抽屉浮层
- 公共 Shell / 语言开关 / 顶栏 chip
- `oaNavCanonical` / `NAV_KEY_TO_PRIMARY_PATH`
- OA layout CSS 聚合
- 除 intake 内容槽以外的 OA 只读工作台

**地瓜04 可消费 / 可写**

- 只读消费第 7 节闭包
- 写 `intake/page.tsx` 的 children 槽
- 写 04 已有发布内容层（上表）
- 不得另造侧栏

---

## 10. 未提交内容（独立补丁 + 逐文件 hash）

下列 **不是冻结对象**。补丁：`docs/oa/publish-r3-shared-shell-input/patches/`

| 文件 | WT hash | 补丁 |
| --- | --- | --- |
| `src/components/oa-shell/OaSharedShell.tsx` | `f264b98e7a1a08dee45866b9b8ab9524a3d0a8ab` | `patches/OaSharedShell.tsx.diff` |
| `src/components/oa-shell/oaNavCanonical.ts` | `36f365b38140ba84572bebfe9e6d6cc2eedaf9e4` | `patches/oaNavCanonical.ts.diff` |
| `src/components/oa-shell/useOaUiLocale.ts` | `4b34c9dd31950a443b26e2e461deaf7c063d43f7` | `patches/useOaUiLocale.ts.diff` |
| `src/components/oa-shell/OaLoc.tsx` | `b2afdd7895ca8e33d3c259f8cf67a6454b5be131` | `patches/OaLoc.tsx.diff`（新增） |
| `src/styles/oa/oa-shell.css` | `63030b5f069f196c551d11295017b3c43e20113f` | `patches/oa-shell.css.diff` |
| `src/styles/oa/oa-tokens.css` | `48b64f997b38f795a632003fdc46fcf64741d0a7` | `patches/oa-tokens.css.diff` |
| `src/components/oa-skeleton/CoSecondaryWorkbench.tsx` | `1ed2883388be0ccfb908f1f134f657768f70de24` | `patches/CoSecondaryWorkbench.tsx.diff` |
| `src/components/oa-skeleton/capabilityGate.ts` | `1bb6a53b05c5b036a68213b431c42f2ca7e2823f` | `patches/capabilityGate.ts.diff` |

工作区另有未提交的各业务工作台文案/配色 diff，**不属于本 Shell 闭包**，04 不要消费。

---

## 04 最小接线

```tsx
import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
// 04 内容：Publish 等。勿改 Publish.tsx 以外的 Shell。

export default function OaCoIntakePage() {
  return (
    <OaSharedShell activeKey="co">
      {/* 04 content slot */}
    </OaSharedShell>
  );
}
```

语言：`useOaUiLocale` + `oaPick`；storage `dohara.oa.language`。

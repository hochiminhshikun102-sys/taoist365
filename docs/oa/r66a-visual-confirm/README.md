# R66A OA Shared Shell 复核入口

VISUAL_CONFIRMATION_PASSED=FALSE  
本目录就是 Plus / 发财可复核入口。不代替老板确认。

固定裁定 SHA（协作仓，本地可无同名 md）：`73330fcf07822f4611da2cdb09aa13310218fe1a`  
候选分支：`dogdan/oa-shared-shell-nav-ux-polish-r66-20261014`  
PRODUCT_HEAD（R66 锁定）：`5f9df3488b9f980319cf0b8f887254db08a3b895`  
PRODUCT_BASE：`bf83dc4e8f1ceeaabfc4d2788271c40bc04d9817`

复核包路径：`D:\DH_WORKSPACE_ACTIVE\OA_R66_SHARED_SHELL_NAV_UX_POLISH_WT\docs\oa\r66a-visual-confirm\`

## 本地复验步骤

```
cd D:\DH_WORKSPACE_ACTIVE\OA_R66_SHARED_SHELL_NAV_UX_POLISH_WT
npx next dev --port 3666
```

打开 `http://localhost:3666/admin/oa/overview`（`output: export`，不要 `next start`）。  
顶栏 **中文 / EN** 写入既有 `dohara.oa.language`。效果图只看排版/层级/浮层位置，不作为运行态中英混排依据。

### PC 1440×900

1. 默认侧栏 14 个一级模块；业务名只跟当前语言。
2. hover **商品与订单 / CO**：右侧浮层可进入点选。
3. hover **运营营销 / Operations**：03A–03G。
4. 滚到底 **系统底座 / Settings**：无子项飞出越界。

Esc 关层；caret 上 Enter / Space / ArrowRight 打开。

### Mobile 390×844

DevTools 390×844 + touch，关闭 fine hover。

5. 抽屉关闭，无整页横溢。
6. 点 **菜单 / Menu**：只开一级，不堆全部子层。
7. 点 CO **▸**：只开 Commerce 子项。
8. 再点 Operations **▸**：只开 03A–03G。

### 语言对照

- 中文：一级/子项/说明为中文（打开看板）；浮层不得出现 `English · 中文`。
- 英文：一级/子项/说明为英文（Open hub）。
- chip 可保留：`read_only` / `not_connected` / `deploy disabled` / `real write disabled`。

## 截图索引（本目录）

布局 8 态（caret 等价展开，因 CDP 禁 hover）：

| 文件 | 内容 |
| --- | --- |
| `01-pc1440-default.png` | PC 默认侧栏 |
| `02-pc1440-commerce-flyout.png` | PC Commerce 浮层 |
| `03-pc1440-operations-flyout.png` | PC Operations 浮层 |
| `04-pc1440-settings-hover.png` | PC Settings 底部定位 |
| `05-m390-drawer-closed.png` | Mobile 抽屉关闭 |
| `06-m390-drawer-open.png` | Mobile 抽屉打开 |
| `07-m390-commerce-panel.png` | Mobile Commerce 子项 |
| `08-m390-operations-panel.png` | Mobile Operations 子项 |

语言对照：

| 文件 | 内容 |
| --- | --- |
| `zh-pc1440-default.png` | 中文 PC 默认侧栏 |
| `zh-pc1440-commerce-flyout.png` | 中文 Commerce 浮层 |
| `zh-pc1440-operations-flyout.png` | 中文 Operations 浮层 |
| `zh-m390-drawer-panel.png` | 中文 390 抽屉+二级 |
| `en-pc1440-default.png` | 英文 PC 默认侧栏 |
| `en-pc1440-commerce-flyout.png` | 英文 Commerce 浮层 |
| `en-m390-drawer-panel.png` | 英文 390 抽屉+二级 |

预存 overlay：`ProjectionTable.tsx (34:13)` Issue badge，非本包。

## 必要优化（非全站重设计）

- 飞出贴侧栏 + 16px bridge；桌面 hover，手机 caret。
- 只开一层；底部 flip；390 夹 left。
- z-index 40；locale 跟随 `dohara.oa.language`。
- 未改商品发布专项路径、未接 Provider、无真实写入。

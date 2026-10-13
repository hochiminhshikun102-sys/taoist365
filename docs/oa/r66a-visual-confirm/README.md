# R66A OA Shared Shell 视觉确认包

VISUAL_CONFIRMATION_PASSED=FALSE  
本包只提供可交互复验路径与截图槽位，不代替老板确认。不得声称视觉确认通过。

固定裁定：`handoff/oa/OA_SHARED_UI_FLYOUT_NAV_DECISION_20261014_CN.md`  
`73330fcf07822f4611da2cdb09aa13310218fe1a`

候选：`dogdan/oa-shared-shell-nav-ux-polish-r66-20261014`  
PRODUCT_HEAD（R66）：`5f9df3488b9f980319cf0b8f887254db08a3b895`  
PRODUCT_BASE：`bf83dc4e8f1ceeaabfc4d2788271c40bc04d9817`

## 本地复验

```
cd D:\DH_WORKSPACE_ACTIVE\OA_R66_SHARED_SHELL_NAV_UX_POLISH_WT
npx next dev --port 3666
```

打开：`http://localhost:3666/admin/oa/overview`  
（`output: export`，不要用 `next start`。）

### PC 1440×900

1. 默认侧栏：14 个一级模块、`English · 中文`、顶栏只读边界四条。
2. 鼠标移到 **CO · 商品与订单**（不要离开空隙）：右侧浮出 intake/objects/media/orders/payments/shipping，鼠标可进入点选。
3. 移到 **Operations · 运营营销**：浮出 03A–03G。
4. 滚到侧栏底部，移到 **Settings · 系统底座**：无子项飞出越界；其它浮层关闭。

键盘：Esc 关闭；caret 上 Enter / Space / ArrowRight 打开；ArrowLeft 关闭。

### Mobile 390×844

Chrome DevTools 390×844，touch，`(hover: hover) and (pointer: fine)` 为 false。

5. 抽屉关闭：主体可见，`documentElement.scrollWidth === 390`，无整页横溢。
6. 点 **Menu · 导航**：只出现 14 个一级模块，caret 全部 collapsed，不堆开全部子层。
7. 点 CO 行 **▸**：只开 Commerce 子项面板。
8. 关闭后点 Operations **▸**：只开 03A–03G。

## 截图槽位（本目录 PNG）

| 文件 | 状态 | 采集说明 |
| --- | --- | --- |
| `01-pc1440-default.png` | 已采集 | PC 默认侧栏；含只读四条 chips |
| `02-pc1440-commerce-flyout.png` | 已采集 | CO 浮层（本环境 CDP Input 禁 hover，用 caret 打开等价展开） |
| `03-pc1440-operations-flyout.png` | 已采集 | Operations 03A–03G（03G 可能在浮层滚动区内） |
| `04-pc1440-settings-hover.png` | 已采集 | Settings 在侧栏底部且为当前项；无子菜单飞出。Next.js Issue badge 叠在 Settings 行上 |
| `05-m390-drawer-closed.png` | 已采集 | 390 列 + Menu；Cursor 预览窗比 390 宽，右侧空白不是页面横溢 |
| `06-m390-drawer-open.png` | 已采集 | 抽屉一级列表；顶部 Overview/CO 可能被顶栏 chips 遮挡，需人工滚看 |
| `07-m390-commerce-panel.png` | 已采集 | 仅 CO 子项；面板夹在 390 内 |
| `08-m390-operations-panel.png` | 已采集 | 仅 Operations 子项；03F/03G 需在面板内滚动 |

预存 overlay：`ProjectionTable.tsx (34:13)` Next.js Issue badge，非本包引入。

## 本轮必要优化（非全站重设计）

- 飞出层 `position:fixed` 贴侧栏右缘，16px bridge，去掉 hover 失效空隙。
- 桌面 hover 打开；手机 `fineHover=false`，只点 caret，不依赖 hover。
- 只开一个浮层；底部模块 flip/clamp。
- 窄视口把飞出 `left` 夹进 `innerWidth - panelWidth - 8`，避免 390 横溢。
- 当前父项 / 子项高亮。
- 飞出 z-index=40，不覆盖正式 modal（建议 modal ≥100）。
- 顶栏可见 `read_only` / `not_connected` / deploy disabled / real write disabled。

## 自检记录（实现侧，不是老板视觉通过）

- 14 个一级模块：Overview…Settings 仍在 `NAV_ITEMS`。
- 标签 `English · 中文`；Overview 中文为「全局看板」，源码无「驾驶舱」。
- 商品发布 27 路径未改：本包只动 `OaSharedShell.tsx`、`oa-shell.css`、本目录文档/截图。
- `oaNavCanonical.ts` 的 `/admin/oa/co/objects` 仅为既有只读导航条目，未改。

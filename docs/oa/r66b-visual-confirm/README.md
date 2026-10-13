# R66B OA Shared Shell 视觉二次收口

VISUAL_CONFIRMATION_PASSED=FALSE  
本目录交给 Plus / 发财复核。不代替老板确认。不自行开 PR / merge / deploy。

固定裁定 SHA：`73330fcf07822f4611da2cdb09aa13310218fe1a`  
PRODUCT_BRANCH：`dogdan/oa-shared-shell-nav-ux-polish-r66-20261014`  
R66 主候选：`5f9df3488b9f980319cf0b8f887254db08a3b895`  
语言修正提交：`f0c6ce20974203255bb26200ce785d59d485e589`  
PRODUCT_BASE：`bf83dc4e8f1ceeaabfc4d2788271c40bc04d9817`

复核包路径：`D:\DH_WORKSPACE_ACTIVE\OA_R66_SHARED_SHELL_NAV_UX_POLISH_WT\docs\oa\r66b-visual-confirm\`

## 本地启动

```
cd D:\DH_WORKSPACE_ACTIVE\OA_R66_SHARED_SHELL_NAV_UX_POLISH_WT
npx next dev --port 3666
```

打开 `http://localhost:3666/admin/oa/overview`（`output: export`，不要 `next start`）。

语言：顶栏 **中文 / EN**，写入既有 `dohara.oa.language`（事件 `dohara-oa-language`）。  
效果图只作布局参考，运行态禁止 `English · 中文` 业务混排。chip token 可保留：`read_only` / `not_connected` / `deploy disabled`。

## 视口

- PC：1440×900
- Mobile：390×844（touch，无 fine hover）

PC 浮层确认用 caret ▸（CDP 禁 hover Input）。桌面 runtime 仍是 fine-pointer hover + 20px 桥接可进入。

## 截图索引

中文：

| 文件 | 状态 |
| --- | --- |
| `zh-pc1440-default.png` | PC 默认 14 模块侧栏 |
| `zh-pc1440-co-flyout.png` | CO 六项浮层（中文） |
| `zh-pc1440-operations-flyout.png` | Operations 03A–03G（中文） |
| `zh-pc1440-settings-flyout.png` | Settings 底部浮层未裁切 |
| `zh-m390-drawer.png` | 390 抽屉一级 |
| `zh-m390-co-panel.png` | 390 CO 子项 |
| `zh-m390-operations-panel.png` | 390 Operations 子项 |

英文：

| 文件 | 状态 |
| --- | --- |
| `en-pc1440-default.png` | PC 默认英文侧栏 |
| `en-pc1440-co-flyout.png` | CO 六项英文 |
| `en-pc1440-operations-flyout.png` | Operations 03A–03G 英文 |
| `en-m390-drawer.png` | 390 英文抽屉 |
| `en-m390-co-panel.png` | 390 CO 英文子项 |

## 本轮必要修

1. 业务标签按 locale 拆开（`OaLoc` / `oaSplitMixed`）。技术 token 保留。
2. PC 浮层移出 shell overflow 容器；桥接 20px；Settings 底部 flip。
3. 顶栏 chip 三枚不截断：`read_only` `not_connected` `deploy disabled`；1440 nowrap，小屏折行。

## 已知未过项

- 预存 overlay：`ProjectionTable.tsx (34:13)`，非本包。
- 部分工作台仍有英文说明段（非中英混排标题）。
- 确认截图工具视口会裁右侧，chip 完整度以 390 顶栏与 runtime 1440 CSS nowrap 为准。
- 不声称 VISUAL_CONFIRMATION_PASSED。

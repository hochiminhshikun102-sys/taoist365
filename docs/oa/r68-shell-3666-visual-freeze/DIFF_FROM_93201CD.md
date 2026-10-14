# R68 vs 旧冻结 `93201cd`

旧冻结：`93201cdb12249f70c4356fe999843afdf4174417`  
04 已消费该 SHA 的框架/变量，但 3666 老板认可视觉在工作区未提交层。R68 把该层收成可追踪对象。

## 从 3666 吸收的视觉

- 顶栏深蓝 `#1C2E4A`（`--navy`），不再用水蓝条当主顶栏。
- 画布 `#F3F5F8`（`--canvas`），侧栏白底。
- 一级图标色块 / 选中态（左条 + sage 底）。
- 顶栏三枚 chip 不截断：`read_only` / `not_connected` / `deploy disabled`（1440 nowrap；小屏可折行）。
- 中文 / EN 开关保留，写入 `dohara.oa.language`。
- PC hover 浮层移出 overflow 容器，20px 桥接可进入。
- Settings 底部 flip，避免裁切。
- Mobile 两步：菜单抽屉 → caret 子面板（无 fine-pointer hover）。
- 导航按 locale 单语，禁止 `English · 中文` 混排。

## 仍保持的冻结合同

- 14 一级模块，无第 15 个。
- `OaSharedShell({ activeKey, children })`，内容槽仍是 `.oa-main`。
- intake 仍 `activeKey="co"`；本 freeze **不改** `src/app/admin/oa/co/intake/page.tsx`。
- 不另造侧栏 / 顶栏 / 语言按钮。
- 语言 API：`useOaUiLocale` / `oaPick` / `oaSplitMixed` / `OA_LANGUAGE_STORAGE_KEY` / `OA_LANGUAGE_EVENT`。
- 不接 Provider，不写真实业务，不改 Cloudflare / env / binding。

## 文件级 diff（相对 `93201cd`）

| 路径 | 93201cd blob | R68 blob | 说明 |
| --- | --- | --- | --- |
| `src/components/oa-shell/OaSharedShell.tsx` | `3bcae3ff` | `f264b98e` | locale 标签、chip、浮层定位 |
| `src/components/oa-shell/oaNavCanonical.ts` | `22c4ae2d` | `36f365b3` | Settings `has_submenu` + 空组以出浮层 |
| `src/components/oa-shell/useOaUiLocale.ts` | `6da55a33` | `4b34c9dd` | `oaSplitMixed` 空白折叠 |
| `src/components/oa-shell/OaLoc.tsx` | 无 | `b2afdd78` | 可选单语包装；Shell 本体未强制引用 |
| `src/styles/oa/oa-shell.css` | `1ddf7834` | `63030b5f` | 顶栏/侧栏/浮层/chip |
| `src/styles/oa/oa-tokens.css` | `d8df65b7` | `48b64f99` | `--navy` `--canvas` 状态色 |

未改：`src/app/admin/oa/layout.tsx`、`intake/page.tsx`、`oa-publish/**`。

## 未解决

- 公共指针菜单：自动化截图用 caret ▸，不能用 CDP `Input.*` 模拟 hover。Runtime 桌面仍是 fine-pointer hover。
- 截图工具视口会裁右侧；chip 完整度以 CSS nowrap + 390 顶栏为准，不声称 VISUAL_CONFIRMATION_PASSED。
- 04 发布内容区旧样式不在本 freeze。04 应消费新 Shell 变量/chrome，不要在旧 `93201cd` 上继续修内容皮肤。
- `ProjectionTable.tsx` overlay 预存，非 Shell。

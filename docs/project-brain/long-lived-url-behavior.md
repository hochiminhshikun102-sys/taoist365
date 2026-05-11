# 长期 URL 行为（Long-Lived URL Behavior）

## 意图

描述「**一直在浏览器里**」的朴素行为：书签、返回、hostname 形状、自动补全、后台驻留——普通、长期、**非怀旧**、非 indie-web cosplay。

## 代码

- `src/data/internet-defaultness-engine/*` → `worldDefaultExistence.internetDefaultnessEngine`（与 `real-internet-defaultness`、`browser-reality-engine` 并存，偏「默认网址」文案与偏置）。

## 与 `long-lived-site-behavior.md` 的关系

`long-lived-site-behavior.md` 偏总述；本文件对齐 **defaultness-engine** 包与 `urlDefaultnessBias` 用途。

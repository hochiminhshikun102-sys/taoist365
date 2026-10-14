"use client";

import { useState } from "react";
import Link from "next/link";
import { overviewFixture } from "../overviewFixture";
import { OaMobileLocaleProvider, useOaMobileLocale } from "@/components/oa-mobile/useOaMobileLocale";
import { MobileFrame } from "./MobileFrame";

const RISK_TITLES = [
  { zh: "库存偏低", en: "Inventory low" },
  { zh: "退款波动观察", en: "Refund spike watch" },
] as const;

const TASK_TITLES = [
  { zh: "审核入库批次", en: "Review intake batch" },
  { zh: "确认结算异常", en: "Confirm payout exception" },
] as const;

export function MobileRiskTodo() {
  return (
    <OaMobileLocaleProvider>
      <MobileRiskTodoView />
    </OaMobileLocaleProvider>
  );
}

function MobileRiskTodoView() {
  const { t } = useOaMobileLocale();
  const f = overviewFixture;
  const [mode, setMode] = useState<"risk" | "todo">("risk");

  return (
    <MobileFrame
      title={t("风险待办清单", "Risk & Todo")}
      backHref="/admin/oa/m/overview"
      bottomCurrent="risk"
    >
      <article className="oa-m-card">
        <h3>{t("页面状态", "Board status")}</h3>
        <div className="oa-m-value" style={{ fontSize: 15 }}>
          {t(`风险 ${f.risks.length} · 任务 ${f.tasks.length}`, `risks ${f.risks.length} · tasks ${f.tasks.length}`)}
        </div>
        <div className="oa-m-meta">
          {t("仅本地分段 UI · 队列变更已阻断", "Local segment UI only · queue mutations blocked")}
        </div>
      </article>

      <div className="oa-m-seg">
        <button type="button" className={mode === "risk" ? "is-on" : ""} onClick={() => setMode("risk")}>
          {t("风险", "Risk")}
        </button>
        <button type="button" className={mode === "todo" ? "is-on" : ""} onClick={() => setMode("todo")}>
          {t("待办", "To-do")}
        </button>
      </div>

      <p className="oa-m-section-title">{mode === "risk" ? t("风险列表", "Risk list") : t("待办列表", "Todo list")}</p>
      {mode === "risk"
        ? f.risks.map((r, i) => (
            <div className="oa-m-row" key={RISK_TITLES[i]?.en ?? r.title}>
              <div className="oa-m-row-top">
                <strong>{t(RISK_TITLES[i]?.zh ?? r.title, RISK_TITLES[i]?.en ?? r.title)}</strong>
                <span className="oa-m-chip is-amber">{r.level}</span>
              </div>
              <div className="oa-m-meta">{t(`截至 ${r.as_of}`, `as_of ${r.as_of}`)}</div>
            </div>
          ))
        : f.tasks.map((task, i) => (
            <div className="oa-m-row" key={TASK_TITLES[i]?.en ?? task.title}>
              <div className="oa-m-row-top">
                <strong>{t(TASK_TITLES[i]?.zh ?? task.title, TASK_TITLES[i]?.en ?? task.title)}</strong>
                <span className="oa-m-chip">{task.due === "Today" ? t("今日", "Today") : task.due}</span>
              </div>
              <div className="oa-m-meta">
                {t("操作按钮已禁用 · 无假完成", "action buttons disabled · no fake complete")}
              </div>
            </div>
          ))}

      <div className="oa-m-actions">
        <Link className="oa-m-btn is-primary" href="/admin/oa/m/overview">
          {t("返回总览", "Back Overview")}
        </Link>
        <button className="oa-m-btn is-disabled" type="button" disabled>
          {t("处理 / 完成 · 已阻断", "Resolve / Complete · Blocked")}
        </button>
      </div>

      <div className="oa-m-note">
        {t(
          "无假成功。错误/空态保留至真实 Provider 队列获准。",
          "No fake success. Error/empty live states stay reserved until a real Provider queue is authorized.",
        )}
      </div>
    </MobileFrame>
  );
}

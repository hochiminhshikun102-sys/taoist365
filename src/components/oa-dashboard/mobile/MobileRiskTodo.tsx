"use client";

import { useState } from "react";
import Link from "next/link";
import { overviewFixture } from "../overviewFixture";
import { MobileFrame } from "./MobileFrame";

export function MobileRiskTodo() {
  const f = overviewFixture;
  const [mode, setMode] = useState<"risk" | "todo">("risk");

  return (
    <MobileFrame
      title="Risk & Todo · 风险待办清单"
      backHref="/admin/oa/m/overview"
      bottomCurrent="risk"
    >
      <article className="oa-m-card">
        <h3>Board status · 页面状态</h3>
        <div className="oa-m-value" style={{ fontSize: 15 }}>
          risks {f.risks.length} · tasks {f.tasks.length}
        </div>
        <div className="oa-m-meta">Local segment UI only · queue mutations blocked</div>
      </article>

      <div className="oa-m-seg">
        <button type="button" className={mode === "risk" ? "is-on" : ""} onClick={() => setMode("risk")}>
          Risk · 风险
        </button>
        <button type="button" className={mode === "todo" ? "is-on" : ""} onClick={() => setMode("todo")}>
          To-do · 待办
        </button>
      </div>

      <p className="oa-m-section-title">{mode === "risk" ? "Risk list · 风险列表" : "Todo list · 待办列表"}</p>
      {mode === "risk"
        ? f.risks.map((r) => (
            <div className="oa-m-row" key={r.title}>
              <div className="oa-m-row-top">
                <strong>{r.title}</strong>
                <span className="oa-m-chip is-amber">{r.level}</span>
              </div>
              <div className="oa-m-meta">as_of {r.as_of}</div>
            </div>
          ))
        : f.tasks.map((t) => (
            <div className="oa-m-row" key={t.title}>
              <div className="oa-m-row-top">
                <strong>{t.title}</strong>
                <span className="oa-m-chip">{t.due}</span>
              </div>
              <div className="oa-m-meta">action buttons disabled · no fake complete</div>
            </div>
          ))}

      <div className="oa-m-actions">
        <Link className="oa-m-btn is-primary" href="/admin/oa/m/overview">
          Back Overview · 返回总览
        </Link>
        <button className="oa-m-btn is-disabled" type="button" disabled>
          Resolve / Complete · Blocked
        </button>
      </div>

      <div className="oa-m-note">
        No fake success. Error/empty live states stay reserved until a real Provider queue is authorized.
      </div>
    </MobileFrame>
  );
}

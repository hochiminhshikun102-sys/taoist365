"use client";

import { useState } from "react";
import { overviewFixture } from "../overviewFixture";
import { MobileFrame } from "./MobileFrame";

export function MobileRiskTodo() {
  const f = overviewFixture;
  const [mode, setMode] = useState<"risk" | "todo">("risk");

  return (
    <MobileFrame title="Risk & To-do List · 风险待办清单" backHref="/admin/oa/m/overview" bottomCurrent="risk">
      <div className="oa-m-seg">
        <button type="button" className={mode === "risk" ? "is-on" : ""} onClick={() => setMode("risk")}>
          Risk · 风险
        </button>
        <button type="button" className={mode === "todo" ? "is-on" : ""} onClick={() => setMode("todo")}>
          To-do · 待办
        </button>
      </div>
      <div>
        {mode === "risk"
          ? f.risks.map((r) => (
              <div className="oa-m-row" key={r.title}>
                <span className="oa-chip">{r.level}</span> {r.title}
              </div>
            ))
          : f.tasks.map((t) => (
              <div className="oa-m-row" key={t.title}>
                {t.title} · {t.due}
              </div>
            ))}
      </div>
      <div className="oa-m-error">error placeholder reserved · no fake success</div>
    </MobileFrame>
  );
}

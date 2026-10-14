import Link from "next/link";
import { overviewFixture } from "../overviewFixture";
import { MobileFrame } from "./MobileFrame";

export function MobileChannel() {
  const f = overviewFixture;
  return (
    <MobileFrame
      title="Channel Detail · 渠道投放明细"
      backHref="/admin/oa/m/overview"
      bottomCurrent="channel"
    >
      <article className="oa-m-card">
        <h3>Board status · 页面状态</h3>
        <div className="oa-m-value" style={{ fontSize: 15 }}>
          ready · fixture list
        </div>
        <div className="oa-m-meta">fields=channel, spend, gmv, roas, status · live fetch not_connected</div>
      </article>

      <p className="oa-m-section-title">Channel cards · 渠道卡片</p>
      {f.channels.map((c) => (
        <div className="oa-m-row" key={c.channel}>
          <div className="oa-m-row-top">
            <strong>{c.channel}</strong>
            <span className="oa-m-chip">{c.status}</span>
          </div>
          <div className="oa-m-meta">
            spend {c.spend} · gmv {c.gmv} · roas {c.roas}
          </div>
        </div>
      ))}

      <article className="oa-m-card">
        <h3>Organic snapshot · 自然流量快照</h3>
        <div className="oa-m-meta">
          sessions {f.organic.sessions} · orders {f.organic.orders} · CVR {f.organic.conversion_rate}
        </div>
      </article>

      <div className="oa-m-actions">
        <Link className="oa-m-btn is-primary" href="/admin/oa/m/overview">
          Back Overview · 返回总览
        </Link>
        <button className="oa-m-btn is-disabled" type="button" disabled>
          Sync Channel · Blocked
        </button>
      </div>

      <div className="oa-m-note">
        No live channel provider. Empty/error live states reserved until Provider wiring is authorized.
      </div>
    </MobileFrame>
  );
}

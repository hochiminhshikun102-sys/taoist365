import { overviewFixture } from "./overviewFixture";

export function OperationsOverviewBoard() {
  const f = overviewFixture;
  const max = Math.max(...f.trend.map((x) => x.v));

  return (
    <section className="oa-page" data-artboard="1440">
      <div className="oa-fixture-banner">
        DATA_SOURCE=TEST_ONLY_UI_FIXTURE · NOT_FORMAL_PROVIDER · 非正式 Provider · 非生产数据
      </div>
      <h1 className="oa-page-title">Operations Overview Board · 经营总览看板</h1>
      <div className="oa-filter-bar">
        <label className="oa-field">
          Date Range · 日期范围
          <input value="2026-10-06 → 2026-10-12" readOnly />
        </label>
        <label className="oa-field">
          Market · 市场
          <select disabled defaultValue="TEST-US">
            <option>TEST-US</option>
          </select>
        </label>
        <label className="oa-field">
          Locale · 语言
          <select disabled defaultValue="TEST-en">
            <option>TEST-en</option>
          </select>
        </label>
        <button className="oa-btn" type="button" disabled title="DISABLED_UNTIL_READY">
          Refresh · 刷新
        </button>
        <button className="oa-btn secondary" type="button" disabled>
          Export · 导出
        </button>
      </div>
      <div className="oa-grid-4">
        {f.kpis.map((k) => (
          <article className="oa-card" key={k.label}>
            <h3>{k.label}</h3>
            <div className="oa-kpi-value">{k.value}</div>
            <div className="oa-kpi-delta">{k.delta}</div>
            <div className="oa-kpi-meta">
              source={k.source} · as_of={k.as_of}
            </div>
          </article>
        ))}
      </div>
      <div className="oa-row-2">
        <article className="oa-card">
          <h3>7-Day GMV Trend · 7日GMV趋势</h3>
          <div className="oa-chart">
            {f.trend.map((p) => (
              <div className="oa-bar" key={p.d} style={{ height: `${Math.round((p.v / max) * 100)}%` }}>
                <span>{p.d.slice(3)}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="oa-card">
          <h3>Global Sales Heat Map · 全球销售热力图</h3>
          <div className="oa-heat">
            {f.heat.map((h) => (
              <div className="oa-heat-cell" key={h.region}>
                <strong>{h.region}</strong>
                <div>{h.sales}</div>
              </div>
            ))}
          </div>
        </article>
      </div>
      <article className="oa-card" style={{ marginBottom: 16 }}>
        <h3>Channel Performance · 渠道投放明细</h3>
        <table className="oa-table">
          <thead>
            <tr>
              <th>Channel · 渠道</th>
              <th>Spend · 花费</th>
              <th>GMV</th>
              <th>ROAS</th>
              <th>Status · 状态</th>
            </tr>
          </thead>
          <tbody>
            {f.channels.map((c) => (
              <tr key={c.channel}>
                <td>{c.channel}</td>
                <td>{c.spend}</td>
                <td>{c.gmv}</td>
                <td>{c.roas}</td>
                <td>{c.status === "watch" ? <span className="oa-chip">watch</span> : c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      <div className="oa-row-2 split" style={{ marginBottom: 16 }}>
        <article className="oa-card">
          <h3>Influencer Collaboration · 达人合作</h3>
          <ul className="oa-list">
            {f.influencers.map((i) => (
              <li key={i.name}>
                {i.name} · {i.platform} · {i.status} · {i.gmv}
              </li>
            ))}
          </ul>
        </article>
        <article className="oa-card">
          <h3>Organic Traffic · 自然流量</h3>
          <ul className="oa-list">
            <li>Sessions · 会话：{f.organic.sessions}</li>
            <li>Orders · 订单：{f.organic.orders}</li>
            <li>Conversion · 转化：{f.organic.conversion_rate}</li>
          </ul>
        </article>
      </div>
      <div className="oa-row-3">
        <article className="oa-card">
          <h3>Risk Alerts · 风险告警</h3>
          <ul className="oa-list">
            {f.risks.map((r) => (
              <li key={r.title}>
                <span className="oa-chip">{r.level}</span> {r.title} · {r.as_of}
              </li>
            ))}
          </ul>
        </article>
        <article className="oa-card">
          <h3>Pending Tasks · 今日待办事项</h3>
          <ul className="oa-list">
            {f.tasks.map((t) => (
              <li key={t.title}>
                {t.title} · {t.due}
              </li>
            ))}
          </ul>
        </article>
        <article className="oa-card">
          <h3>Regional Status · 区域运营状态</h3>
          <ul className="oa-list">
            {f.regions.map((r) => (
              <li key={r.code}>
                {r.code} · {r.status} · {r.gmv} / {r.orders}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

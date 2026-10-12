import { overviewFixture } from "../overviewFixture";
import { MobileFrame } from "./MobileFrame";

export function MobileChannel() {
  const f = overviewFixture;
  return (
    <MobileFrame title="Channel Data Detail · 渠道投放明细" backHref="/admin/oa/m/overview">
      <div className="oa-m-loading">state=ready · fields=channel,spend,gmv,roas,status</div>
      {f.channels.map((c) => (
        <div className="oa-m-row" key={c.channel}>
          <strong>{c.channel}</strong>
          <div>
            spend {c.spend} · gmv {c.gmv} · roas {c.roas}
          </div>
        </div>
      ))}
      <div className="oa-m-empty">empty/error placeholders reserved · DISABLED_UNTIL_READY for live fetch</div>
    </MobileFrame>
  );
}

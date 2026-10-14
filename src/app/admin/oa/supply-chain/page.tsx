import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";
import { SupplyChainProjectionWorkbench } from "@/components/oa-supply-chain/SupplyChainProjectionWorkbench";

export default function OaSupplyChainPage() {
  return (
    <OaSharedShell activeKey="supply_chain">
      <OaDesktopStatusStrip moduleLabel="Supply Chain · 供应链管理" status="read_only" />
      <SupplyChainProjectionWorkbench />
    </OaSharedShell>
  );
}

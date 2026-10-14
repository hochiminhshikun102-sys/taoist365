import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";
import { SupplyChainProjectionWorkbench } from "@/components/oa-supply-chain/SupplyChainProjectionWorkbench";

export default function OaSupplyChainPage() {
  return (
    <OaSharedShell activeKey="supply_chain">
      <OaDesktopStatusStrip moduleKey="supply_chain" status="read_only" />
      <SupplyChainProjectionWorkbench />
    </OaSharedShell>
  );
}

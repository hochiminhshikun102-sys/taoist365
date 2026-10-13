import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { SupplyChainProjectionWorkbench } from "@/components/oa-supply-chain/SupplyChainProjectionWorkbench";

export default function OaSupplyChainPage() {
  return (
    <OaSharedShell activeKey="supply_chain">
      <SupplyChainProjectionWorkbench />
    </OaSharedShell>
  );
}

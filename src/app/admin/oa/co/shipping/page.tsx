import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { ShippingRuntimeWorkbench } from "@/components/oa-shipping/ShippingRuntimeWorkbench";

export default function OaCoShippingPage() {
  return (
    <OaSharedShell activeKey="co">
      <ShippingRuntimeWorkbench />
    </OaSharedShell>
  );
}

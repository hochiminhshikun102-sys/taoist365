import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OrdersRuntimeWorkbench } from "@/components/oa-orders/OrdersRuntimeWorkbench";

export default function OaCoOrdersPage() {
  return (
    <OaSharedShell activeKey="co">
      <OrdersRuntimeWorkbench />
    </OaSharedShell>
  );
}

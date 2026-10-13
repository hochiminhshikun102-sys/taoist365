import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { PaymentsRuntimeWorkbench } from "@/components/oa-payments/PaymentsRuntimeWorkbench";

export default function OaCoPaymentsPage() {
  return (
    <OaSharedShell activeKey="co">
      <PaymentsRuntimeWorkbench />
    </OaSharedShell>
  );
}

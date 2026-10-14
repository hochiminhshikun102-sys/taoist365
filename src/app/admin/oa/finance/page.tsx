import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { FinanceProjectionWorkbench } from "@/components/oa-finance/FinanceProjectionWorkbench";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaFinancePage() {
  return (
    <OaSharedShell activeKey="finance">
      <OaDesktopStatusStrip
        moduleKey="finance"
        status="read_only"
        nextHref="/admin/oa/co/payments"
        nextKey="payments"
      />
      <FinanceProjectionWorkbench />
    </OaSharedShell>
  );
}

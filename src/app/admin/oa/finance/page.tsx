import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { FinanceProjectionWorkbench } from "@/components/oa-finance/FinanceProjectionWorkbench";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaFinancePage() {
  return (
    <OaSharedShell activeKey="finance">
      <OaDesktopStatusStrip
        moduleLabel="Finance · 财务中心"
        status="read_only"
        nextHref="/admin/oa/co/payments"
        nextLabel="Next · Payments runtime · 支付管理"
      />
      <FinanceProjectionWorkbench />
    </OaSharedShell>
  );
}

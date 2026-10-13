import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { FinanceProjectionWorkbench } from "@/components/oa-finance/FinanceProjectionWorkbench";

export default function OaFinancePage() {
  return (
    <OaSharedShell activeKey="finance">
      <FinanceProjectionWorkbench />
    </OaSharedShell>
  );
}

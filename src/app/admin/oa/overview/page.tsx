import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OperationsOverviewBoard } from "@/components/oa-dashboard/OperationsOverviewBoard";

export default function OaOverviewPage() {
  return (
    <OaSharedShell activeKey="overview">
      <OperationsOverviewBoard />
    </OaSharedShell>
  );
}

import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OperationsOverviewBoard } from "@/components/oa-dashboard/OperationsOverviewBoard";
import { OverviewExceptionProjectionWorkbench } from "@/components/oa-overview/OverviewExceptionProjectionWorkbench";
import { OverviewReadinessControlBoard } from "@/components/oa-overview/OverviewReadinessControlBoard";

export default function OaOverviewPage() {
  return (
    <OaSharedShell activeKey="overview">
      <OverviewReadinessControlBoard />
      <OperationsOverviewBoard />
      <OverviewExceptionProjectionWorkbench />
    </OaSharedShell>
  );
}

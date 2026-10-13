import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OverviewExceptionProjectionWorkbench } from "@/components/oa-overview/OverviewExceptionProjectionWorkbench";

export default function OaOverviewPage() {
  return (
    <OaSharedShell activeKey="overview">
      <OverviewExceptionProjectionWorkbench />
    </OaSharedShell>
  );
}

import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";
import { OverviewExceptionProjectionWorkbench } from "@/components/oa-overview/OverviewExceptionProjectionWorkbench";

export default function OaOverviewPage() {
  return (
    <OaSharedShell activeKey="overview">
      <OaDesktopStatusStrip moduleKey="overview" status="read_only" />
      <OverviewExceptionProjectionWorkbench />
    </OaSharedShell>
  );
}

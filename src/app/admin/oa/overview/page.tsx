import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";
import { OverviewExceptionProjectionWorkbench } from "@/components/oa-overview/OverviewExceptionProjectionWorkbench";

export default function OaOverviewPage() {
  return (
    <OaSharedShell activeKey="overview">
      <OaDesktopStatusStrip moduleLabel="Overview · 全局看板" status="read_only" />
      <OverviewExceptionProjectionWorkbench />
    </OaSharedShell>
  );
}

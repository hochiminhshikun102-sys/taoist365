import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { LogisticsProjectionWorkbench } from "@/components/oa-logistics/LogisticsProjectionWorkbench";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaLogisticsPage() {
  return (
    <OaSharedShell activeKey="logistics">
      <OaDesktopStatusStrip
        moduleKey="logistics"
        status="read_only"
        nextHref="/admin/oa/co/shipping"
        nextKey="shipping"
      />
      <LogisticsProjectionWorkbench />
    </OaSharedShell>
  );
}

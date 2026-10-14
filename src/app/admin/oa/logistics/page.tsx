import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { LogisticsProjectionWorkbench } from "@/components/oa-logistics/LogisticsProjectionWorkbench";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaLogisticsPage() {
  return (
    <OaSharedShell activeKey="logistics">
      <OaDesktopStatusStrip
        moduleLabel="Logistics · 物流管理"
        status="read_only"
        nextHref="/admin/oa/co/shipping"
        nextLabel="Next · Shipping runtime · 发货管理"
      />
      <LogisticsProjectionWorkbench />
    </OaSharedShell>
  );
}

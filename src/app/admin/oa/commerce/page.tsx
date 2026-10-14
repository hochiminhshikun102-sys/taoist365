import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { CoOverviewWorkbench } from "@/components/oa-commerce/CoOverviewWorkbench";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

/** CO hub — six workbench overview (R47 read-only operations entry). */
export default function OaCommercePage() {
  return (
    <OaSharedShell activeKey="co">
      <OaDesktopStatusStrip
        moduleLabel="CO · 商品与订单"
        status="read_only"
        nextHref="/admin/oa/co/orders"
        nextLabel="Next · Orders runtime · 订单系统"
      />
      <CoOverviewWorkbench />
    </OaSharedShell>
  );
}

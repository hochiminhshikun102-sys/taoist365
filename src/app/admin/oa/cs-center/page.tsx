import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { CsCenterProjectionWorkbench } from "@/components/oa-cs-center/CsCenterProjectionWorkbench";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaCsCenterPage() {
  return (
    <OaSharedShell activeKey="cs_center">
      <OaDesktopStatusStrip
        moduleLabel="CS Center · 客户满意中心"
        status="read_only"
        nextHref="/admin/oa/co/orders"
        nextLabel="Next · Orders inquiry · 订单查询"
      />
      <CsCenterProjectionWorkbench />
    </OaSharedShell>
  );
}

import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { CsCenterProjectionWorkbench } from "@/components/oa-cs-center/CsCenterProjectionWorkbench";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaCsCenterPage() {
  return (
    <OaSharedShell activeKey="cs_center">
      <OaDesktopStatusStrip
        moduleKey="cs_center"
        status="read_only"
        nextHref="/admin/oa/co/orders"
        nextKey="orders"
      />
      <CsCenterProjectionWorkbench />
    </OaSharedShell>
  );
}

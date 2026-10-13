import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { CoOverviewWorkbench } from "@/components/oa-commerce/CoOverviewWorkbench";

/** CO hub — six workbench overview (R47 read-only operations entry). */
export default function OaCommercePage() {
  return (
    <OaSharedShell activeKey="co">
      <CoOverviewWorkbench />
    </OaSharedShell>
  );
}

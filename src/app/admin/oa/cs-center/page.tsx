import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { CsCenterProjectionWorkbench } from "@/components/oa-cs-center/CsCenterProjectionWorkbench";

export default function OaCsCenterPage() {
  return (
    <OaSharedShell activeKey="cs_center">
      <CsCenterProjectionWorkbench />
    </OaSharedShell>
  );
}

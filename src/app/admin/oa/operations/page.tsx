import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";
import { OperationsReadonlyWorkbench } from "@/components/oa-operations/OperationsReadonlyWorkbench";

export default function OaOperationsPage() {
  return (
    <OaSharedShell activeKey="operations">
      <OaDesktopStatusStrip moduleKey="operations" status="read_only" />
      <OperationsReadonlyWorkbench />
    </OaSharedShell>
  );
}

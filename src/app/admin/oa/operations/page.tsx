import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";
import { OperationsReadonlyWorkbench } from "@/components/oa-operations/OperationsReadonlyWorkbench";

export default function OaOperationsPage() {
  return (
    <OaSharedShell activeKey="operations">
      <OaDesktopStatusStrip moduleLabel="Operations · 运营营销" status="read_only" />
      <OperationsReadonlyWorkbench />
    </OaSharedShell>
  );
}

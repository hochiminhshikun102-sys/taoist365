import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { ComplianceProjectionWorkbench } from "@/components/oa-compliance/ComplianceProjectionWorkbench";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaCompliancePage() {
  return (
    <OaSharedShell activeKey="compliance">
      <OaDesktopStatusStrip moduleLabel="Compliance · 合规法务" status="read_only" />
      <ComplianceProjectionWorkbench />
    </OaSharedShell>
  );
}

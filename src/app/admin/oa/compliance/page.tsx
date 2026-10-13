import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { ComplianceProjectionWorkbench } from "@/components/oa-compliance/ComplianceProjectionWorkbench";

export default function OaCompliancePage() {
  return (
    <OaSharedShell activeKey="compliance">
      <ComplianceProjectionWorkbench />
    </OaSharedShell>
  );
}

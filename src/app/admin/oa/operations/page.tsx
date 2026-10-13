import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OperationsReadonlyWorkbench } from "@/components/oa-operations/OperationsReadonlyWorkbench";

export default function OaOperationsPage() {
  return (
    <OaSharedShell activeKey="operations">
      <OperationsReadonlyWorkbench />
    </OaSharedShell>
  );
}

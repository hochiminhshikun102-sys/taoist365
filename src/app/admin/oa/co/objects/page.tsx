import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { ObjectsRuntimeWorkbench } from "@/components/oa-objects/ObjectsRuntimeWorkbench";

export default function OaCoObjectsPage() {
  return (
    <OaSharedShell activeKey="co">
      <ObjectsRuntimeWorkbench />
    </OaSharedShell>
  );
}

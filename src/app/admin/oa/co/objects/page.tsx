import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { CoSecondaryWorkbench } from "@/components/oa-skeleton/CoSecondaryWorkbench";

export default function OaCoObjectsPage() {
  return (
    <OaSharedShell activeKey="co">
      <CoSecondaryWorkbench workbenchId="objects" />
    </OaSharedShell>
  );
}

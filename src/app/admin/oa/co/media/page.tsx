import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { CoSecondaryWorkbench } from "@/components/oa-skeleton/CoSecondaryWorkbench";

export default function OaCoMediaPage() {
  return (
    <OaSharedShell activeKey="co">
      <CoSecondaryWorkbench workbenchId="media" />
    </OaSharedShell>
  );
}

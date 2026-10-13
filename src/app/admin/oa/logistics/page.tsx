import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { LogisticsProjectionWorkbench } from "@/components/oa-logistics/LogisticsProjectionWorkbench";

export default function OaLogisticsPage() {
  return (
    <OaSharedShell activeKey="logistics">
      <LogisticsProjectionWorkbench />
    </OaSharedShell>
  );
}

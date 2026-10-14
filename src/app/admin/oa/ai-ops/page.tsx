import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { AiOpsReadonlyWorkbench } from "@/components/oa-ai-ops/AiOpsReadonlyWorkbench";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaAiOpsPage() {
  return (
    <OaSharedShell activeKey="ai_ops">
      <OaDesktopStatusStrip moduleKey="ai_ops" status="read_only" />
      <AiOpsReadonlyWorkbench />
    </OaSharedShell>
  );
}

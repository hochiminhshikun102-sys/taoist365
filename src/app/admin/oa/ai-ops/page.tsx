import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { AiOpsReadonlyWorkbench } from "@/components/oa-ai-ops/AiOpsReadonlyWorkbench";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaAiOpsPage() {
  return (
    <OaSharedShell activeKey="ai_ops">
      <OaDesktopStatusStrip moduleLabel="AI Ops · AI 推广中心" status="read_only" />
      <AiOpsReadonlyWorkbench />
    </OaSharedShell>
  );
}

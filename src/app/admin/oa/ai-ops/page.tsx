import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { AiOpsReadonlyWorkbench } from "@/components/oa-ai-ops/AiOpsReadonlyWorkbench";

export default function OaAiOpsPage() {
  return (
    <OaSharedShell activeKey="ai_ops">
      <AiOpsReadonlyWorkbench />
    </OaSharedShell>
  );
}

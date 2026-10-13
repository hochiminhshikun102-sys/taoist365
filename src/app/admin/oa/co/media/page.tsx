import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { MediaRuntimeWorkbench } from "@/components/oa-media/MediaRuntimeWorkbench";

export default function OaCoMediaPage() {
  return (
    <OaSharedShell activeKey="co">
      <MediaRuntimeWorkbench />
    </OaSharedShell>
  );
}

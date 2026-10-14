import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { MemberServiceReadonlyBoard } from "@/components/oa-member-service/MemberServiceReadonlyBoard";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaGsPage() {
  return (
    <OaSharedShell activeKey="gs">
      <OaDesktopStatusStrip
        moduleLabel="GS · 全球买手"
        status="not_connected"
        nextHref="/admin/oa/overview"
        nextLabel="Next · Overview · 返回总览"
      />
      <MemberServiceReadonlyBoard moduleId="gs" />
    </OaSharedShell>
  );
}

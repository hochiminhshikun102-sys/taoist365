import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { MemberServiceReadonlyBoard } from "@/components/oa-member-service/MemberServiceReadonlyBoard";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaWkPage() {
  return (
    <OaSharedShell activeKey="wk">
      <OaDesktopStatusStrip
        moduleLabel="WK · WindKeep"
        status="not_connected"
        nextHref="/admin/oa/overview"
        nextLabel="Next · Overview · 返回总览"
      />
      <MemberServiceReadonlyBoard moduleId="wk" />
    </OaSharedShell>
  );
}

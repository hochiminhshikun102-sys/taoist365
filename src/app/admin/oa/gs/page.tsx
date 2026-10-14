import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { MemberServiceReadonlyBoard } from "@/components/oa-member-service/MemberServiceReadonlyBoard";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaGsPage() {
  return (
    <OaSharedShell activeKey="gs">
      <OaDesktopStatusStrip
        moduleKey="gs"
        status="not_connected"
        nextHref="/admin/oa/overview"
        nextKey="overview"
      />
      <MemberServiceReadonlyBoard moduleId="gs" />
    </OaSharedShell>
  );
}

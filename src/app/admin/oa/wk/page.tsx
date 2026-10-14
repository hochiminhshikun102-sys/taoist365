import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { MemberServiceReadonlyBoard } from "@/components/oa-member-service/MemberServiceReadonlyBoard";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaWkPage() {
  return (
    <OaSharedShell activeKey="wk">
      <OaDesktopStatusStrip
        moduleKey="wk"
        status="not_connected"
        nextHref="/admin/oa/overview"
        nextKey="overview"
      />
      <MemberServiceReadonlyBoard moduleId="wk" />
    </OaSharedShell>
  );
}

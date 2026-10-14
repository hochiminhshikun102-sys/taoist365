import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";
import { SiteGeoReadonlyWorkbench } from "@/components/oa-site-geo/SiteGeoReadonlyWorkbench";

export default function OaSitePage() {
  return (
    <OaSharedShell activeKey="site">
      <OaDesktopStatusStrip moduleKey="site" status="read_only" />
      <SiteGeoReadonlyWorkbench />
    </OaSharedShell>
  );
}

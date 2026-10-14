import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";
import { SiteGeoReadonlyWorkbench } from "@/components/oa-site-geo/SiteGeoReadonlyWorkbench";

export default function OaSitePage() {
  return (
    <OaSharedShell activeKey="site">
      <OaDesktopStatusStrip moduleLabel="Site · 站点前台" status="read_only" />
      <SiteGeoReadonlyWorkbench />
    </OaSharedShell>
  );
}

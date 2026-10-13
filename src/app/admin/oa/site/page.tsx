import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { SiteGeoReadonlyWorkbench } from "@/components/oa-site-geo/SiteGeoReadonlyWorkbench";

export default function OaSitePage() {
  return (
    <OaSharedShell activeKey="site">
      <SiteGeoReadonlyWorkbench />
    </OaSharedShell>
  );
}

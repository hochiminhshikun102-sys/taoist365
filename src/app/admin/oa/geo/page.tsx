import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { GeoReadonlyWorkbench } from "@/components/oa-site-geo/GeoReadonlyWorkbench";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";

export default function OaGeoPage() {
  return (
    <OaSharedShell activeKey="geo">
      <OaDesktopStatusStrip moduleKey="geo" status="read_only" />
      <GeoReadonlyWorkbench />
    </OaSharedShell>
  );
}

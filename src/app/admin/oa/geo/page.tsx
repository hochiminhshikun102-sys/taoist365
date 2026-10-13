import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { GeoReadonlyWorkbench } from "@/components/oa-site-geo/GeoReadonlyWorkbench";

export default function OaGeoPage() {
  return (
    <OaSharedShell activeKey="geo">
      <GeoReadonlyWorkbench />
    </OaSharedShell>
  );
}

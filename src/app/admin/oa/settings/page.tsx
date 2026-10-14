import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";
import { PlatformReadonlyBoard } from "@/components/oa-platform/PlatformReadonlyBoard";

export default function OaSettingsPage() {
  return (
    <OaSharedShell activeKey="settings">
      <OaDesktopStatusStrip
        moduleKey="settings"
        status="not_connected"
        nextHref="/admin/oa/overview"
        nextKey="overview"
      />
      <PlatformReadonlyBoard moduleId="settings" />
    </OaSharedShell>
  );
}

import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";
import { PlatformReadonlyBoard } from "@/components/oa-platform/PlatformReadonlyBoard";

export default function OaSettingsPage() {
  return (
    <OaSharedShell activeKey="settings">
      <OaDesktopStatusStrip
        moduleLabel="Settings · 系统底座"
        status="not_connected"
        nextHref="/admin/oa/overview"
        nextLabel="Next · Overview · 返回总览"
      />
      <PlatformReadonlyBoard moduleId="settings" />
    </OaSharedShell>
  );
}

import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { OaDesktopStatusStrip } from "@/components/oa-overview/OaDesktopStatusStrip";
import { ProviderConnectionCenter } from "@/components/oa-settings/ProviderConnectionCenter";
import "@/styles/oa/oa-settings.css";

export default function OaSettingsPage() {
  return (
    <OaSharedShell activeKey="settings">
      <OaDesktopStatusStrip
        moduleKey="settings"
        status="not_connected"
        nextHref="/admin/oa/overview"
        nextKey="overview"
      />
      <ProviderConnectionCenter />
    </OaSharedShell>
  );
}

import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { PlatformReadonlyBoard } from "./PlatformReadonlyBoard";
import { getPlatformReadonlyModule } from "./platformReadonlyFixture";
import type { PlatformReadonlyModuleId } from "./platformReadonlyTypes";

type Props = {
  moduleId: PlatformReadonlyModuleId;
};

export function PlatformReadonlyPage({ moduleId }: Props) {
  const mod = getPlatformReadonlyModule(moduleId);
  if (!mod) {
    throw new Error(`Unknown platform readonly module: ${moduleId}`);
  }
  return (
    <OaSharedShell activeKey={mod.activeKey}>
      <PlatformReadonlyBoard moduleId={moduleId} />
    </OaSharedShell>
  );
}

import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { GrowthReadonlyBoard } from "./GrowthReadonlyBoard";
import { getGrowthReadonlyModule } from "./growthReadonlyFixture";
import type { GrowthReadonlyModuleId } from "./growthReadonlyTypes";

type Props = {
  moduleId: GrowthReadonlyModuleId;
};

export function GrowthReadonlyPage({ moduleId }: Props) {
  const mod = getGrowthReadonlyModule(moduleId);
  if (!mod) {
    throw new Error(`Unknown growth readonly module: ${moduleId}`);
  }
  return (
    <OaSharedShell activeKey={mod.activeKey}>
      <GrowthReadonlyBoard moduleId={moduleId} />
    </OaSharedShell>
  );
}

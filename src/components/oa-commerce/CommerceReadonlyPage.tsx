import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { CommerceReadonlyBoard } from "./CommerceReadonlyBoard";
import { getCommerceReadonlyModule } from "./commerceReadonlyFixture";
import type { CommerceReadonlyModuleId } from "./commerceReadonlyTypes";

type Props = {
  moduleId: CommerceReadonlyModuleId;
};

export function CommerceReadonlyPage({ moduleId }: Props) {
  const mod = getCommerceReadonlyModule(moduleId);
  if (!mod) {
    throw new Error(`Unknown commerce readonly module: ${moduleId}`);
  }
  return (
    <OaSharedShell activeKey={mod.activeKey}>
      <CommerceReadonlyBoard moduleId={moduleId} />
    </OaSharedShell>
  );
}

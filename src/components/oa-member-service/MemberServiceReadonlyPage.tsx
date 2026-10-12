import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import { MemberServiceReadonlyBoard } from "./MemberServiceReadonlyBoard";
import { getMemberServiceReadonlyModule } from "./memberServiceReadonlyFixture";
import type { MemberServiceReadonlyModuleId } from "./memberServiceReadonlyTypes";

type Props = {
  moduleId: MemberServiceReadonlyModuleId;
};

export function MemberServiceReadonlyPage({ moduleId }: Props) {
  const mod = getMemberServiceReadonlyModule(moduleId);
  if (!mod) {
    throw new Error(`Unknown member-service readonly module: ${moduleId}`);
  }
  return (
    <OaSharedShell activeKey={mod.activeKey}>
      <MemberServiceReadonlyBoard moduleId={moduleId} />
    </OaSharedShell>
  );
}

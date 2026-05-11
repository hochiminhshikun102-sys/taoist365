import { ambientStructureRuntimeLine } from "./ambient-structure-runtime";
import { interfaceBackgroundingLine } from "./interface-backgrounding";
import { interfaceThinningRuntimeLine } from "./interface-thinning-runtime";
import { nonInteractionPresenceLine } from "./non-interaction-presence";
import { nonUiPresenceLine } from "./non-ui-presence";
import { passiveLayoutExistenceLine } from "./passive-layout-existence";
import { quietLayoutFatigueLine } from "./quiet-layout-fatigue";
import { quietReadingGravityLine } from "./quiet-reading-gravity";
import { structuralDissolutionLine } from "./structural-dissolution";

export type InterfaceDissolutionEngineBundle = {
  interfaceThinningRuntimeLine: string;
  nonInteractionPresenceLine: string;
  quietLayoutFatigueLine: string;
  interfaceBackgroundingLine: string;
  ambientStructureRuntimeLine: string;
  nonUiPresenceLine: string;
  passiveLayoutExistenceLine: string;
  quietReadingGravityLine: string;
  structuralDissolutionLine: string;
};

export function resolveInterfaceDissolutionEngineBundle(): InterfaceDissolutionEngineBundle {
  return {
    interfaceThinningRuntimeLine: interfaceThinningRuntimeLine(),
    nonInteractionPresenceLine: nonInteractionPresenceLine(),
    quietLayoutFatigueLine: quietLayoutFatigueLine(),
    interfaceBackgroundingLine: interfaceBackgroundingLine(),
    ambientStructureRuntimeLine: ambientStructureRuntimeLine(),
    nonUiPresenceLine: nonUiPresenceLine(),
    passiveLayoutExistenceLine: passiveLayoutExistenceLine(),
    quietReadingGravityLine: quietReadingGravityLine(),
    structuralDissolutionLine: structuralDissolutionLine(),
  };
}

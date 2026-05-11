import { getLivingDayKey } from "@/lib/living-day-key";
import { worldStateIdForDayKey, type WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";
import { worldAgeStateId, type WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { pickAmbientMaterialDensityLine } from "./ambient-material-density";
import { materialBoundaryReminder } from "./material-presence-boundaries";
import { pickBrowserGlowLine } from "./browser-glow-runtime";
import { pickDomesticSurfaceLine } from "./domestic-surface-runtime";
import { pickLightFalloffLine } from "./light-falloff";
import { resolveMaterialWeathering, type MaterialWeatheringSlice } from "./material-weathering";
import { pickPaperAgingLine } from "./paper-aging";
import { pickPhysicalSilenceLine } from "./physical-silence";
import { pickQuietLightPhysicsLine } from "./quiet-light-physics";
import { pickRoomAirLine, type RoomAirContext } from "./room-air-runtime";
import { pickSurfaceMemory, type SurfaceMemoryContext } from "./surface-memory";
import { textureDensityBudget, textureFatigueAuditLine, type TextureDensityBudget } from "./texture-fatigue";
import { resolveVisualAgingRuntime, type VisualAgingRuntime } from "./visual-aging-runtime";

export type { SurfaceMemoryContext, RoomAirContext };
export { pickObjectTouchSediment } from "./object-touch-sediment";
export { resolveMaterialWeathering, type MaterialWeatheringSlice } from "./material-weathering";
export { textureDensityBudget, type TextureDensityBudget } from "./texture-fatigue";
export { materialBoundaryReminder, MATERIAL_PRESENCE_FORBIDDEN } from "./material-presence-boundaries";

export type WorldMaterializationBundle = {
  dayKey: string;
  worldStateId: WorldStateId;
  ageStateId: WorldAgeStateId;
  weathering: MaterialWeatheringSlice;
  surfaceMemory: Record<SurfaceMemoryContext, string>;
  roomAir: Record<RoomAirContext, string>;
  paperAgingLine: string;
  ambientMaterialDensityLine: string;
  domesticSurfaceLine: string;
  physicalSilenceLine: string;
  lightFalloffLine: string;
  quietLightPhysicsLine: string;
  browserGlowLine: string;
  visualAging: VisualAgingRuntime;
  textureBudget: TextureDensityBudget;
  textureFatigueAuditLine: string;
  materialBoundaryLine: string;
};

function airFor(
  context: RoomAirContext,
  age: WorldAgeStateId,
  worldId: WorldStateId,
  dayKey: string,
): string {
  return pickRoomAirLine(context, age, worldId, dayKey);
}

function surfFor(context: SurfaceMemoryContext, age: WorldAgeStateId, dayKey: string): string {
  return pickSurfaceMemory(context, age, dayKey);
}

export function resolveWorldMaterializationBundle(now: Date = new Date()): WorldMaterializationBundle {
  const dayKey = getLivingDayKey(now);
  const worldStateId = worldStateIdForDayKey(dayKey);
  const ageStateId = worldAgeStateId(dayKey, worldStateId);

  return {
    dayKey,
    worldStateId,
    ageStateId,
    weathering: resolveMaterialWeathering(ageStateId, dayKey),
    surfaceMemory: {
      home: surfFor("home", ageStateId, dayKey),
      objects: surfFor("objects", ageStateId, dayKey),
      desk: surfFor("desk", ageStateId, dayKey),
      mail: surfFor("mail", ageStateId, dayKey),
    },
    roomAir: {
      home: airFor("home", ageStateId, worldStateId, dayKey),
      guidance: airFor("guidance", ageStateId, worldStateId, dayKey),
      mail: airFor("mail", ageStateId, worldStateId, dayKey),
      objects: airFor("objects", ageStateId, worldStateId, dayKey),
      ritual: airFor("ritual", ageStateId, worldStateId, dayKey),
      desk: airFor("desk", ageStateId, worldStateId, dayKey),
    },
    paperAgingLine: pickPaperAgingLine(ageStateId, dayKey),
    ambientMaterialDensityLine: pickAmbientMaterialDensityLine(ageStateId, dayKey),
    domesticSurfaceLine: pickDomesticSurfaceLine(ageStateId, dayKey),
    physicalSilenceLine: pickPhysicalSilenceLine(ageStateId, dayKey),
    lightFalloffLine: pickLightFalloffLine(ageStateId, dayKey),
    quietLightPhysicsLine: pickQuietLightPhysicsLine(ageStateId, dayKey),
    browserGlowLine: pickBrowserGlowLine(ageStateId, dayKey),
    visualAging: resolveVisualAgingRuntime(ageStateId, dayKey),
    textureBudget: textureDensityBudget(ageStateId),
    textureFatigueAuditLine: textureFatigueAuditLine(ageStateId, dayKey),
    materialBoundaryLine: materialBoundaryReminder(),
  };
}

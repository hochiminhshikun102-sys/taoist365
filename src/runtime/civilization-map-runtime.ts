import { dailyIndex } from "@/lib/living-day-key";
import { firstQuietCivilizationRoomSeeds } from "@/runtime/quiet-room-seeds";

export type CivilizationMapRuntime = {
  mapState: "atmosphericNavigation" | "roomConstellation" | "lowPressureTopology" | "nonLinearPaths" | "quietSpatialRelation";
  mapLine: string;
  topologyLine: string;
  constellationRooms: readonly (typeof firstQuietCivilizationRoomSeeds)[number][];
  suppressMenuFeeling: boolean;
};

export function resolveCivilizationMapRuntime(dayKey: string): CivilizationMapRuntime {
  const h = dailyIndex(`${dayKey}:civilization-map`, 100);
  const mapState =
    h < 22
      ? "atmosphericNavigation"
      : h < 42
        ? "roomConstellation"
        : h < 62
          ? "lowPressureTopology"
          : h < 82
            ? "nonLinearPaths"
            : "quietSpatialRelation";
  const start = dailyIndex(`${dayKey}:civilization-map-start`, firstQuietCivilizationRoomSeeds.length);
  const constellationRooms = [0, 1, 2, 3].map((offset) => firstQuietCivilizationRoomSeeds[(start + offset) % firstQuietCivilizationRoomSeeds.length]);

  return {
    mapState,
    mapLine:
      mapState === "atmosphericNavigation"
        ? "Navigation becomes atmospheric before it becomes a menu."
        : mapState === "roomConstellation"
          ? "Rooms form a constellation, not a feature grid."
          : mapState === "lowPressureTopology"
            ? "Low-pressure topology lets rooms sit near each other quietly."
            : mapState === "nonLinearPaths"
              ? "Non-linear wandering paths keep the city from becoming a funnel."
              : "Quiet spatial relationships hold the civilization together.",
    topologyLine: "Dohara grows more like a small quiet city than a menu.",
    constellationRooms,
    suppressMenuFeeling: h > 16,
  };
}

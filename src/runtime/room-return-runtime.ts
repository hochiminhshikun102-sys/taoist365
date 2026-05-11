import { dailyIndex } from "@/lib/living-day-key";

export type RoomReturnRuntime = {
  roomReturnState:
    | "familiarityAccumulation"
    | "gentleReturnAtmosphere"
    | "spatialMemory"
    | "softRoomPersistence"
    | "ordinaryRoomContinuity";
  roomReturnLine: string;
  roomMemoryLine: string;
  avoidPersonalizedMemory: boolean;
};

export function resolveRoomReturnRuntime(dayKey: string): RoomReturnRuntime {
  const h = dailyIndex(`${dayKey}:room-return`, 100);
  const roomReturnState =
    h < 20
      ? "familiarityAccumulation"
      : h < 40
        ? "gentleReturnAtmosphere"
        : h < 60
          ? "spatialMemory"
          : h < 80
            ? "softRoomPersistence"
            : "ordinaryRoomContinuity";

  return {
    roomReturnState,
    roomReturnLine:
      roomReturnState === "familiarityAccumulation"
        ? "Familiarity gathers in the room, not in a profile."
        : roomReturnState === "gentleReturnAtmosphere"
          ? "Return atmosphere stays gentle and unannounced."
          : roomReturnState === "spatialMemory"
            ? "Spatial memory is only the remembered air of a room."
            : roomReturnState === "softRoomPersistence"
              ? "Soft room persistence makes revisiting feel possible."
              : "Ordinary room continuity is enough to find the way back.",
    roomMemoryLine: "Rooms can feel remembered without remembering the user.",
    avoidPersonalizedMemory: true,
  };
}

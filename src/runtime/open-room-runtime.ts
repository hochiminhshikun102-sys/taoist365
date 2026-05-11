import { dailyIndex } from "@/lib/living-day-key";

export type OpenRoomRuntime = {
  roomState:
    | "roomOpenness"
    | "breathableTransitions"
    | "outsideConnected"
    | "softPermeability"
    | "openEndedContinuity";
  roomLine: string;
  transitionLine: string;
  preventCocoonRoom: boolean;
};

export function resolveOpenRoomRuntime(dayKey: string): OpenRoomRuntime {
  const h = dailyIndex(`${dayKey}:open-room`, 100);
  const roomState =
    h < 20
      ? "roomOpenness"
      : h < 40
        ? "breathableTransitions"
        : h < 60
          ? "outsideConnected"
          : h < 80
            ? "softPermeability"
            : "openEndedContinuity";

  return {
    roomState,
    roomLine:
      roomState === "roomOpenness"
        ? "The rooms stay open at the edges."
        : roomState === "breathableTransitions"
          ? "Transitions between rooms should breathe."
          : roomState === "outsideConnected"
            ? "Each room keeps a quiet connection to outside air."
            : roomState === "softPermeability"
              ? "Soft permeability keeps the room from becoming a cocoon."
              : "Open-ended continuity lets rooms remain unfinished.",
    transitionLine: "Rooms should feel passable, not enclosing.",
    preventCocoonRoom: true,
  };
}

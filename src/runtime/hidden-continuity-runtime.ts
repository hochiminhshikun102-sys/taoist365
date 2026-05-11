import { dailyIndex } from "@/lib/living-day-key";

export type HiddenContinuityRuntime = {
  continuityState:
    | "subtleEcho"
    | "hiddenResidue"
    | "distantTrace"
    | "lowVisibilityMemory"
    | "crossRoomClimate";
  hiddenContinuityLine: string;
  worldBelongingLine: string;
  avoidExplanation: boolean;
};

export function resolveHiddenContinuityRuntime(dayKey: string): HiddenContinuityRuntime {
  const h = dailyIndex(`${dayKey}:hidden-continuity`, 100);
  const continuityState =
    h < 22
      ? "subtleEcho"
      : h < 42
        ? "hiddenResidue"
        : h < 62
          ? "distantTrace"
          : h < 82
            ? "lowVisibilityMemory"
            : "crossRoomClimate";

  return {
    continuityState,
    hiddenContinuityLine:
      continuityState === "subtleEcho"
        ? "A subtle room echo passes without becoming a link."
        : continuityState === "hiddenResidue"
          ? "Hidden atmospheric residue lets rooms know each other quietly."
          : continuityState === "distantTrace"
            ? "A distant continuity trace keeps the city coherent."
            : continuityState === "lowVisibilityMemory"
              ? "Low-visibility room memory remains below explanation."
              : "Cross-room emotional climate makes the rooms feel related.",
    worldBelongingLine: "The rooms belong to one world without explaining how.",
    avoidExplanation: h > 10,
  };
}

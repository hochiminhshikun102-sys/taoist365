import { dailyIndex } from "@/lib/living-day-key";

export type EverydayPresenceRuntime = {
  presenceState:
    | "softEverydayContinuity"
    | "ordinaryDigitalCoexistence"
    | "practicalBackground"
    | "browserSidePresence"
    | "lowAttentionPersistence";
  everydayLine: string;
  backgroundLine: string;
  suppressAttentionCapture: boolean;
};

export function resolveEverydayPresenceRuntime(dayKey: string): EverydayPresenceRuntime {
  const h = dailyIndex(`${dayKey}:everyday-presence`, 100);
  const presenceState =
    h < 20
      ? "softEverydayContinuity"
      : h < 40
        ? "ordinaryDigitalCoexistence"
        : h < 60
          ? "practicalBackground"
          : h < 80
            ? "browserSidePresence"
            : "lowAttentionPersistence";

  return {
    presenceState,
    everydayLine:
      presenceState === "softEverydayContinuity"
        ? "Everyday continuity stays soft."
        : presenceState === "ordinaryDigitalCoexistence"
          ? "Digital coexistence remains ordinary."
          : presenceState === "practicalBackground"
            ? "The practical background is enough."
            : presenceState === "browserSidePresence"
              ? "Browser-side presence keeps to the side."
              : "Low-attention persistence lets the page remain without asking.",
    backgroundLine: "It can be part of the day without becoming the day.",
    suppressAttentionCapture: true,
  };
}

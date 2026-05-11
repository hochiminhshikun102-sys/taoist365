import { dailyIndex } from "@/lib/living-day-key";

export type BrowserCoexistenceRuntime = {
  coexistenceState:
    | "backgroundExistence"
    | "withoutInterruption"
    | "softRoomPersistence"
    | "ambientDigitalPresence"
    | "companionlessCompanionship";
  coexistenceLine: string;
  ambientLine: string;
  suppressCompanionProductTone: boolean;
};

export function resolveBrowserCoexistenceRuntime(dayKey: string): BrowserCoexistenceRuntime {
  const h = dailyIndex(`${dayKey}:browser-coexistence`, 100);
  const coexistenceState =
    h < 20
      ? "backgroundExistence"
      : h < 40
        ? "withoutInterruption"
        : h < 60
          ? "softRoomPersistence"
          : h < 80
            ? "ambientDigitalPresence"
            : "companionlessCompanionship";

  return {
    coexistenceState,
    coexistenceLine:
      coexistenceState === "backgroundExistence"
        ? "The page can exist in the background of a day."
        : coexistenceState === "withoutInterruption"
          ? "Coexistence means not interrupting."
          : coexistenceState === "softRoomPersistence"
            ? "Soft room persistence holds beside the browser edge."
            : coexistenceState === "ambientDigitalPresence"
              ? "Ambient digital presence stays gentle and non-central."
              : "It may feel present without becoming a companion product.",
    ambientLine: "Taoist365 can stay beside life without asking to become life.",
    suppressCompanionProductTone: true,
  };
}

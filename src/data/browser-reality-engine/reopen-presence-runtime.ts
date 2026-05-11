import { dailyIndex } from "@/lib/living-day-key";
import { nonUrgentReopenReminder } from "./non-urgent-reopen";
import { returnWithoutPurposeLine } from "./return-without-purpose";

export type ReopenMood =
  | "passingThrough"
  | "idleReturn"
  | "nightCheck"
  | "backgroundRefresh"
  | "openWithoutNeed"
  | "stayedOpenAgain";

export type ReopenPresenceRuntime = {
  reopenMood: ReopenMood;
  reopenLine: string;
  nonUrgencyReminder: string;
  noNeedToFinishLine: string;
};

export function resolveReopenPresenceRuntime(dayKey: string): ReopenPresenceRuntime {
  const moods: ReopenMood[] = [
    "passingThrough",
    "idleReturn",
    "nightCheck",
    "backgroundRefresh",
    "openWithoutNeed",
    "stayedOpenAgain",
  ];
  const reopenMood = moods[dailyIndex(`${dayKey}:reopen`, moods.length)]!;
  return {
    reopenMood,
    reopenLine: "标签一直在后台也没关系。",
    nonUrgencyReminder: nonUrgentReopenReminder(dayKey),
    noNeedToFinishLine: returnWithoutPurposeLine(dayKey),
  };
}

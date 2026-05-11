import { dailyIndex } from "@/lib/living-day-key";
import type { BreathingMode } from "@/data/world-regulation-engine/world-breathing-runtime";

export type TabPersistenceState =
  | "newlyOpened"
  | "familiar"
  | "longOpen"
  | "forgottenButAlive"
  | "backgroundResident"
  | "oldQuietTab";

export type LongTabRuntime = {
  tabPersistenceState: TabPersistenceState;
  tabPersistenceLine: string;
  browserCornerPresence: string;
  quietBrowserWeight: string;
  reopenWithoutReasonLine: string;
};

export function resolveLongTabRuntime(dayKey: string, breathingMode: BreathingMode): LongTabRuntime {
  const h = dailyIndex(`${dayKey}:tab-persist`, 100);
  let tabPersistenceState: TabPersistenceState = "familiar";
  if (h < 12) tabPersistenceState = "newlyOpened";
  else if (h < 38) tabPersistenceState = "familiar";
  else if (h < 62) tabPersistenceState = "longOpen";
  else if (h < 78) tabPersistenceState = "forgottenButAlive";
  else if (h < 92) tabPersistenceState = "backgroundResident";
  else tabPersistenceState = "oldQuietTab";

  if (breathingMode === "residualOnly" || breathingMode === "almostStill") {
    tabPersistenceState = h % 2 === 0 ? "backgroundResident" : "forgottenButAlive";
  }

  return {
    tabPersistenceState,
    tabPersistenceLine: "这个标签页已经开了很久。",
    browserCornerPresence: "它不是提醒。它没有等你。只是还没被关掉。",
    quietBrowserWeight: "像地址栏旁边一块安静重量——不催操作。",
    reopenWithoutReasonLine: "重新点开时常常没有具体事要做。",
  };
}

import { dailyIndex } from "@/lib/living-day-key";
import { antiClevernessLine } from "./anti-cleverness-runtime";
import { antiDesignedQuietnessLine } from "./anti-designed-quietness";
import { antiDigitalMonasteryLine } from "./anti-digital-monastery";
import { antiRuntimePerformanceLine } from "./anti-runtime-performance";
import { resolveAntiMetaReminder } from "./anti-meta-runtime";

export type AntiSystemSelfAwarenessBundle = {
  dayKey: string;
  antiMetaReminder: string;
  /** Rare footer line — deterministic */
  showAntiMetaFooter: boolean;
  antiClevernessLine: string;
  antiRuntimePerformanceLine: string;
  antiDigitalMonasteryLine: string;
  antiDesignedQuietnessLine: string;
};

export function resolveAntiSystemSelfAwarenessBundle(dayKey: string): AntiSystemSelfAwarenessBundle {
  const h = dailyIndex(`${dayKey}:anti-sys`, 100);
  return {
    dayKey,
    antiMetaReminder: resolveAntiMetaReminder(dayKey),
    showAntiMetaFooter: h % 19 === 0,
    antiClevernessLine: antiClevernessLine(),
    antiRuntimePerformanceLine: antiRuntimePerformanceLine(),
    antiDigitalMonasteryLine: antiDigitalMonasteryLine(),
    antiDesignedQuietnessLine: antiDesignedQuietnessLine(),
  };
}

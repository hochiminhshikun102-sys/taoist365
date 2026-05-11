import type { RuntimeFatigueBalance } from "./runtime-fatigue-balancer";
import { dailyIndex } from "@/lib/living-day-key";

export type ResidualForegroundSlot = "material" | "human" | "browser" | "ritual" | "mail" | "object";

export type ResidualBalance = {
  /** 每页 foreground 允许的 residual 通道数（1–2） */
  maxForegroundResidualSlots: 1 | 2;
  /** 今天优先 foreground 的通道 */
  preferredSlots: ResidualForegroundSlot[];
  residualBalanceLine: string;
};

export function resolveResidualBalance(f: RuntimeFatigueBalance, dayKey: string): ResidualBalance {
  const maxForegroundResidualSlots: 1 | 2 = f.materializationLoad + f.lowSignalLoad > 0.95 ? 1 : 2;
  const order: ResidualForegroundSlot[] = ["material", "human", "browser", "ritual", "mail", "object"];
  const i = dailyIndex(`${dayKey}:res-bal`, order.length);
  const preferredSlots = [order[i]!, order[(i + 3) % order.length]!].slice(0, maxForegroundResidualSlots);
  return {
    maxForegroundResidualSlots,
    preferredSlots,
    residualBalanceLine: "Residual balance: only one or two residue channels speak loudly today; the rest stay back.",
  };
}

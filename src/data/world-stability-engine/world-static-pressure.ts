import { dailyIndex } from "@/lib/living-day-key";

export type WorldStaticPressure = {
  staticPressure: number;
  staticPressureLine: string;
};

export function resolveWorldStaticPressure(dayKey: string): WorldStaticPressure {
  const h = dailyIndex(`${dayKey}:static-p`, 100);
  return {
    staticPressure: Math.min(0.95, 0.36 + h / 210),
    staticPressureLine: "静态压力偏高：新块更难挤进来。",
  };
}

import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

export type AttentionWithdrawal = {
  withdrawalStrength: number;
  nonUrgencyLine: string;
  lowPressurePresenceLine: string;
  backgroundPersistenceLine: string;
};

export function resolveAttentionWithdrawal(age: WorldAgeStateId, dayKey: string): AttentionWithdrawal {
  const h = dailyIndex(`${dayKey}:attn-wd:${age}`, 100);
  const withdrawalStrength = Math.min(0.95, 0.35 + h / 200);
  return {
    withdrawalStrength,
    nonUrgencyLine: "这里不会追你回来。离开很久也不会变成“错过”。",
    lowPressurePresenceLine: "不需要持续使用；网址不会用任务感绑住你。",
    backgroundPersistenceLine: "页面更像长期停在后台的标签——还在，但不抢。",
  };
}

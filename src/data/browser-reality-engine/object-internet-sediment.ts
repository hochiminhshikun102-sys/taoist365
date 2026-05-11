import { dailyIndex } from "@/lib/living-day-key";

export type ObjectInternetSediment = {
  /** Subset of regulation foreground ids — URL-side long residence, not catalog completeness */
  sedimentForegroundIds: readonly string[];
  internetSedimentLine: string;
  browserAssociatedObjectsLine: string;
  urlLinkedObjectsLine: string;
  lowRefreshObjectsLine: string;
};

export function resolveObjectInternetSediment(
  regulatedForegroundIds: readonly string[],
  dayKey: string,
  foregroundFriction: number,
): ObjectInternetSediment {
  let keep = regulatedForegroundIds.length;
  if (foregroundFriction > 0.48) keep = Math.max(1, keep - 1);
  if (foregroundFriction > 0.72) keep = Math.max(1, keep - 1);
  const h = dailyIndex(`${dayKey}:obj-sed`, 100);
  if (h > 88) keep = Math.max(1, keep - 1);
  const sedimentForegroundIds = regulatedForegroundIds.slice(0, Math.max(1, keep));
  return {
    sedimentForegroundIds,
    internetSedimentLine: "物件像网址结构里长期停着的物，不是每天换橱窗。",
    browserAssociatedObjectsLine: "同一只杯子总在 Objects 里——像 tab 旁常驻的那只。",
    urlLinkedObjectsLine: "和 hostname 绑在一起的想象物，低频挪动。",
    lowRefreshObjectsLine: "前景少，背景厚；完整目录不是每日任务。",
  };
}

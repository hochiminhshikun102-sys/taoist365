import { siteConfig } from "@/config/site";
import { dailyIndex } from "@/lib/living-day-key";

export type HostnameFamiliarity = {
  hostnameFamiliarityLine: string;
  bookmarkBarResidue: string;
  browserAutoCompleteMemory: string;
  quietUrlRecognition: string;
};

export function resolveHostnameFamiliarity(dayKey: string): HostnameFamiliarity {
  const host = siteConfig.domain;
  const h = dailyIndex(`${dayKey}:host`, 100);
  void h;
  return {
    hostnameFamiliarityLine: `熟的是 ${host} 在浏览器里的位置，不是今天换了什么文案。`,
    bookmarkBarResidue: "地址栏一打前几个字母，它自己浮出来。",
    browserAutoCompleteMemory: "自动完成里那一行像旧家具：位置固定。",
    quietUrlRecognition: "认网址，不认活动。",
  };
}

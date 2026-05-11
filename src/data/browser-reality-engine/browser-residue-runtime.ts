import { dailyIndex } from "@/lib/living-day-key";

export type BrowserResidueRuntime = {
  browserResidueLine: string;
};

export function resolveBrowserResidueRuntime(dayKey: string): BrowserResidueRuntime {
  void dailyIndex(`${dayKey}:bres`, 35);
  return {
    browserResidueLine: "残留感来自地址和排版习惯，不是来自“又更新了”。",
  };
}

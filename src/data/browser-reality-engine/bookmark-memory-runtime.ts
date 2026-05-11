import { dailyIndex } from "@/lib/living-day-key";

export type BookmarkMemoryRuntime = {
  bookmarkBarResidueLine: string;
};

export function resolveBookmarkMemoryRuntime(dayKey: string): BookmarkMemoryRuntime {
  void dailyIndex(`${dayKey}:bm`, 10);
  return {
    bookmarkBarResidueLine: "书签条里名字排久了，就不靠内容想起这个站。",
  };
}

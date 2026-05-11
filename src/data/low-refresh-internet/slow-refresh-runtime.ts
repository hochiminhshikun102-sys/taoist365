export type SlowRefreshRuntime = {
  slowRefreshLine: string;
};

export function resolveSlowRefreshRuntime(): SlowRefreshRuntime {
  return { slowRefreshLine: "刷新感刻意做低：像旧页面一直开着。" };
}

export type SlowChangeGovernor = {
  slowChangeGovernorLine: string;
};

export function resolveSlowChangeGovernor(): SlowChangeGovernor {
  return {
    slowChangeGovernorLine: "改动要慢：像改实体书排版，不像发版日志。",
  };
}

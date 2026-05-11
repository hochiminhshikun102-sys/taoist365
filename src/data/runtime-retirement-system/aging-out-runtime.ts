export type AgingOutRuntime = {
  agingOutLine: string;
};

export function resolveAgingOutRuntime(): AgingOutRuntime {
  return {
    agingOutLine: "该退场的前景色自动让位给背景。",
  };
}

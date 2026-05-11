import type { ChannelRetirement } from "./runtime-retirement-registry";

export type RuntimeLifecycleRuntime = {
  lifecycleSummaryLine: string;
  channelRetirement: ChannelRetirement;
};

export function resolveRuntimeLifecycleRuntime(channelRetirement: ChannelRetirement): RuntimeLifecycleRuntime {
  return {
    channelRetirement,
    lifecycleSummaryLine: "部分 runtime 长期退到背景——不是删库，是退休。",
  };
}

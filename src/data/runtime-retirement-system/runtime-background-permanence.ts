export type RuntimeBackgroundPermanence = {
  backgroundPermanentLine: string;
};

export function resolveRuntimeBackgroundPermanence(): RuntimeBackgroundPermanence {
  return {
    backgroundPermanentLine: "背景位是长期编制，不是临时隐藏。",
  };
}

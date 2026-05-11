export type QuietReturnRecognition = {
  quietReturnLine: string;
};

export function resolveQuietReturnRecognition(): QuietReturnRecognition {
  return { quietReturnLine: "安静回来：认得的是页面气候，不是进度。" };
}

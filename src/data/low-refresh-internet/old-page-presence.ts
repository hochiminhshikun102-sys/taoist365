export type OldPagePresence = {
  oldPageLine: string;
};

export function resolveOldPagePresence(): OldPagePresence {
  return { oldPageLine: "旧页面还在，只是没人宣布。" };
}

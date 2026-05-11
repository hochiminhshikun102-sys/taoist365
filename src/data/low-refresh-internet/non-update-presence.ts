export type NonUpdatePresence = {
  nonUpdateLine: string;
};

export function resolveNonUpdatePresence(): NonUpdatePresence {
  return { nonUpdateLine: "没有“今天新了什么”的口气。" };
}

export type PassiveBrowserRefresh = {
  passiveRefreshLine: string;
};

export function resolvePassiveBrowserRefresh(): PassiveBrowserRefresh {
  return { passiveRefreshLine: "浏览器刷新也不改变“长期停在这”的感觉。" };
}

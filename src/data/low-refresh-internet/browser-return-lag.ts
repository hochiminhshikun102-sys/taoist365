export type BrowserReturnLag = {
  returnLagLine: string;
};

export function resolveBrowserReturnLag(): BrowserReturnLag {
  return { returnLagLine: "再点开时，页面不急着证明它更新了。" };
}

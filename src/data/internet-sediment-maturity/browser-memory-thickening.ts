export type BrowserMemoryThickening = {
  memoryThickeningLine: string;
};

export function resolveBrowserMemoryThickening(): BrowserMemoryThickening {
  return { memoryThickeningLine: "厚的是浏览器自己的堆叠，不是本站数据库。" };
}

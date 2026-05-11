/** Calendar day in America/Los_Angeles — stable “site day” for daily slices (not a feed). */
export function getLivingDayKey(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function dailyIndex(dayKey: string, modulus: number): number {
  let h = 2166136261;
  for (let i = 0; i < dayKey.length; i++) {
    h ^= dayKey.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % modulus;
}

/** Calendar month in America/Los_Angeles — pairs with `getLivingDayKey` for seasonal drift copy. */
export function getPacificMonth(now: Date = new Date()): number {
  const m = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    month: "numeric",
  }).format(now);
  return parseInt(m, 10);
}

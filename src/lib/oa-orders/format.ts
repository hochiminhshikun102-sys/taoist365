/** Format integer minor units without inventing FX conversion. */
export function formatMinor(amountMinor: number, currency: string): string {
  const safe = Number.isFinite(amountMinor) ? amountMinor : 0;
  const major = (safe / 100).toFixed(2);
  return `${currency} ${major}`;
}

export function statusLabel(value: string): string {
  return String(value || "unknown").replaceAll("_", " ");
}

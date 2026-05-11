/** Non-visual audit: what materialization prose must never imitate. */

export const MATERIAL_PRESENCE_FORBIDDEN = [
  "spotlit one-point lighting or film-set interiors",
  "lifestyle room porn, influencer staging, or showroom quiet",
  "fake Japanese minimalism, status-signaling silence, or expensive loneliness",
  "curated depression, beautiful sadness, or wellness set-dressing",
] as const;

export function materialBoundaryReminder(): string {
  return "Ordinary long-use rooms only—no staged stillness, no borrowed prestige.";
}

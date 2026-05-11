/**
 * Micro-presence fragments — utility residue only (data silence).
 */

export const microPresenceFragments = [
  "Tab unchanged.",
  "Same footer.",
  "No new banner.",
  "Keyboard idle.",
  "Cursor blink.",
  "Fan noise steady.",
  "Street volume normal.",
  "One lamp on.",
  "Mug empty.",
  "Chair pushed in.",
  "Screen dimmed.",
  "Router lights steady.",
  "No toast.",
  "Scroll position held.",
  "PDF still open.",
  "Mail unchecked.",
  "Battery mid.",
  "WiFi icon steady.",
  "Clock correct.",
  "Room noise low.",
] as const;

export function microPresenceForIndex(i: number): string {
  const idx = ((i % microPresenceFragments.length) + microPresenceFragments.length) % microPresenceFragments.length;
  return microPresenceFragments[idx];
}

/**
 * Why a thing sticks in memory — not craft specs; quiet narrative residue per catalog line.
 */
const memoryStoriesByItemId: Record<string, string> = {
  "folded-paper-note":
    "You keep refolding it because throwing it away would pretend the sentence never mattered. The paper remembers stress lines more honestly than you do.",
  "tea-cup-warmth":
    "It stays because warmth measures time in small mercy—the kind no app logs. You remember who poured last because the cup remembers hands.",
  "ceramic-window-bowl":
    "Light arrives before intention does; the bowl catches both without demanding purpose. You notice it because your eyes needed somewhere honest to land.",
  "linen-sheet-edge":
    "Edges fray where bodies negotiated space without speaking. You notice the crooked hem because comfort stopped auditioning for symmetry.",
  "wood-light-line":
    "Grain holds sunlight like a slow receipt from the afternoon. You return to that board because change there happens at wood speed, not headline speed.",
  "incense-after-scent":
    "After smoke, air thins into proof something stopped before drama could. You remember it because endings rarely smell this polite.",
  "open-corner-space":
    "Emptiness stayed brave longer than clutter did. You guard it because one honest gap keeps the room from pretending it is full.",
  "unfinished-page":
    "Dog-eared loyalty to a thought you refused to rush. You never shelved it because shelving would mean calling the thinking finished.",
};

export function objectMemoryStory(itemId: string): string {
  return (
    memoryStoriesByItemId[itemId] ??
    "It stayed because leaving became harder than keeping—a quiet domestic loyalty objects understand without debate."
  );
}

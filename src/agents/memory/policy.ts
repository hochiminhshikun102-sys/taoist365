import type { JourneyMemory } from "@/types/emotional-guidance";

export interface MemoryPolicyResult {
  pass: boolean;
  scopeTag: "session_continuity" | "light_preference_memory";
  reasons: string[];
}

const disallowedSignals = [
  "personality simulation",
  "attachment optimization",
  "relationship memory",
  "psychological profile",
  "dependency scoring",
];

/**
 * Memory policy boundaries:
 * - Short-term: session continuity only
 * - Long-term: lightweight preference memory only
 * - Never: deep personality model, dependency relationship memory
 */
export function evaluateMemoryPolicy(memory?: JourneyMemory): MemoryPolicyResult {
  if (!memory) {
    return { pass: true, scopeTag: "session_continuity", reasons: [] };
  }

  const reasons: string[] = [];

  const sessionSnippetVolume = memory.recentSessionSnippets.length;
  if (sessionSnippetVolume > 30) {
    reasons.push("session_snippet_window_too_large");
  }

  const memoryBlob = JSON.stringify(memory).toLowerCase();
  for (const signal of disallowedSignals) {
    if (memoryBlob.includes(signal)) {
      reasons.push(`disallowed_memory_signal:${signal}`);
    }
  }

  return {
    pass: reasons.length === 0,
    scopeTag: "light_preference_memory",
    reasons,
  };
}

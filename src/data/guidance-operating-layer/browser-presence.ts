/**
 * Browser presence — very weak continuity only; no chat-memory theater.
 */

export const browserPresence = {
  allowed: ["Same domain and CSS as the rest of the site. Nothing here builds a profile."],
  forbidden: ["Server recall of this session or chat-style ‘resume where you left off’."],
} as const;

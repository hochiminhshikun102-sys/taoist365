import { dailyIndex } from "@/lib/living-day-key";

export type SlowContentEntry = {
  label: string;
  present: string;
  nearby: string;
  note: string;
};

const dailyLines = [
  "A page can stay open while the day goes on.",
  "Some lines are better when they do not ask to be finished.",
  "The same quiet URL can wait through ordinary errands.",
  "A small note can remain without becoming a task.",
] as const;

const quietNotes = [
  "Half a sentence left near the edge of the browser.",
  "A note that can return without asking for a response.",
  "Plain text, not recently touched.",
  "Something short enough to leave alone.",
] as const;

const objectLines = [
  "The cup stays near the screen and stops being new.",
  "A tray becomes useful by being there again.",
  "Linen on a rail, named once, then mostly left alone.",
  "Paper remembers a corner without needing a label.",
] as const;

const windkeepLines = [
  "An object can move on and still feel nearby.",
  "Old names stay useful when hands change.",
  "A shelf can remember slowly.",
  "The thing keeps going without becoming a story.",
] as const;

const homeLines = [
  "Leave it open, or do not.",
  "A few pages nearby.",
  "Mail can wait.",
  "The site stays quiet between visits.",
] as const;

function pickPair(lines: readonly string[], key: string) {
  const index = dailyIndex(key, lines.length);
  const previousIndex = (index + lines.length - 1) % lines.length;
  return {
    present: lines[index]!,
    nearby: lines[previousIndex]!,
  };
}

export function resolveSlowContentRuntime(now = new Date()): readonly SlowContentEntry[] {
  const dayKey = now.toISOString().slice(0, 10);
  const groups = [
    { label: "Daily line", lines: dailyLines, note: "Low-frequency line; no streak or update pressure." },
    { label: "Quiet fragments", lines: quietNotes, note: "Fragments can remain unfinished." },
    { label: "Objects wording", lines: objectLines, note: "Object wording shifts only as upkeep." },
    { label: "Windkeep wording", lines: windkeepLines, note: "Object passage stays slow and non-market." },
    { label: "Home wording", lines: homeLines, note: "Home copy stays sparse during observation." },
  ] as const;

  return groups.map((group) => {
    const pair = pickPair(group.lines, `${dayKey}:${group.label}`);
    return {
      label: group.label,
      present: pair.present,
      nearby: pair.nearby,
      note: group.note,
    };
  });
}

export const contentRuntimeBoundaries = [
  "No streak.",
  "No freshness pressure.",
  "No endless reading.",
  "No response loop.",
  "No public climate change.",
] as const;

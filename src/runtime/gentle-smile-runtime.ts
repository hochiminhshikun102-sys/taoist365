import { dailyIndex } from "@/lib/living-day-key";

export type GentleSmileRuntime = {
  smileState:
    | "almostSmiling"
    | "quietAmusement"
    | "unexpectedWarmth"
    | "humanAwkwardness"
    | "roomTenderPlay";
  smileLine: string;
  roomTraceLine: string;
  allowTinySmile: boolean;
};

export function resolveGentleSmileRuntime(dayKey: string): GentleSmileRuntime {
  const h = dailyIndex(`${dayKey}:gentle-smile`, 100);
  const smileState =
    h < 22
      ? "almostSmiling"
      : h < 42
        ? "quietAmusement"
        : h < 62
          ? "unexpectedWarmth"
          : h < 82
            ? "humanAwkwardness"
            : "roomTenderPlay";

  return {
    smileState,
    smileLine:
      smileState === "almostSmiling"
        ? "Something in the room is almost smiling, but does not perform it."
        : smileState === "quietAmusement"
          ? "A quiet amusement trace passes through the room and leaves no punchline."
          : smileState === "unexpectedWarmth"
            ? "A small unexpected warmth makes the browser room feel human."
            : smileState === "humanAwkwardness"
              ? "A tiny human awkwardness keeps the civilization from becoming too perfect."
              : "Room tenderness becomes briefly playful without becoming entertainment.",
    roomTraceLine: "One object seems placed a little too honestly, and the room lets it stay.",
    allowTinySmile: h > 18 && h < 88,
  };
}

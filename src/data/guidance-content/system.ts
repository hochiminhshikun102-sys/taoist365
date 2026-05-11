export const drawGuidanceContent = {
  phaseHints: {
    arrival: "Start",
    threshold: "Next",
    shake: "Move once",
    moonBlock: "Draw",
    guidance: "Lines",
    pause: "Stop",
    continuation: "End",
  },
  guidanceLayers: [
    "Take one thing slower than yesterday.",
    "Leave one choice open; come back in a few minutes.",
    "Name one thing that already feels a bit calmer.",
    "If a thought loops, notice it without answering yet.",
    "Cooling between people often looks like shorter texts first.",
    "If plans run ahead of the calendar, park one detail.",
    "Put one small task back on the list instead of doing it now.",
    "Unfinished items can stay on the desk without a verdict.",
  ],
  shakeDescription: "One slow movement. Wait before reading anything into it.",
  moonBlockMessage: "A drawn symbol—texture only, not a decision.",
  pausePrompt: "—",
  continuationNote: "Closing the tab does not start a follow-up task.",
} as const;

export const dailyGuidanceContent = {
  phaseHints: {
    arrival: "Start",
    guidance: "Note",
    action: "Do one thing",
    pause: "Stop",
    completion: "Done",
    return: "Later",
  },
  focusLines: [
    "Leave one morning transition unplanned.",
    "Keep one short gap empty.",
    "Pick one task to do at normal speed, not rushed.",
    "Delay naming one choice until noon.",
    "Notice one borrowed worry voice and drop it.",
    "Touch one offline surface before the next scroll.",
  ],
  actionLines: [
    "Three slow breaths before the next move.",
    "Feet on the floor for five seconds, then continue.",
    "Shoulders down once.",
    "Close two reflex tabs.",
    "Water before the next reply.",
    "Label one harsh thought as ‘tired’ instead of ‘true’.",
  ],
  pausePrompts: ["—", "—", "—", "—", "—", "—"],
  completionLines: [
    "Stop mid-page anytime.",
    "A later visit does not ask where you stopped.",
    "Partial notes are fine.",
  ],
} as const;

export const homeHarmonyContent = {
  phaseHints: {
    arrival: "Start",
    awareness: "Look",
    grounding: "Materials",
    pause: "Stop",
    guidance: "One tweak",
    completion: "Done",
    return: "Later",
  },
  awarenessLines: [
    "Light in one corner.",
    "One clear surface.",
    "Space between objects.",
    "Outside sound faint inside.",
    "Cooler air near the window.",
    "Footsteps elsewhere in the building.",
  ],
  materialCalmnessLines: [
    "Leave wood, paper, and one ceramic where they are.",
    "Keep one shelf half empty on purpose.",
    "Close the laptop to the angle that feels enough.",
    "If incense went out, leave the trace.",
  ],
  pausePrompts: ["—", "—", "—", "—", "—", "—"],
  spatialGuidanceLines: [
    "Dim one lamp.",
    "Clear half of one surface.",
    "Move one chair slightly.",
    "Lower one bright screen.",
  ],
  completionLines: [
    "The room can stay as-is.",
    "Come back to the same clutter or the same calm.",
    "Rinsing dishes slowly counts.",
  ],
} as const;

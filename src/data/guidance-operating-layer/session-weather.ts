/**
 * Session weather — room atmosphere, not emotional diagnosis.
 */

export type SessionWeatherId =
  | "quiet-evening"
  | "crowded-mind"
  | "drifting-attention"
  | "emotional-static"
  | "low-inner-noise"
  | "temporary-uncertainty"
  | "overfull-room";

export const sessionWeatherById: Record<
  SessionWeatherId,
  { label: string; roomLine: string }
> = {
  "quiet-evening": {
    label: "Quiet evening",
    roomLine: "Light pools smaller; sound has fewer places to hide.",
  },
  "crowded-mind": {
    label: "Crowded mind",
    roomLine: "Too many tabs in the head—air still moves near the sill.",
  },
  "drifting-attention": {
    label: "Drifting attention",
    roomLine: "Focus keeps sliding off like a mug ring that never dries even.",
  },
  "emotional-static": {
    label: "Emotional static",
    roomLine: "The room hums neutral; feelings do not need a verdict to sit.",
  },
  "low-inner-noise": {
    label: "Low inner noise",
    roomLine: "Small sounds carry—radiator, fridge, nothing performing calm.",
  },
  "temporary-uncertainty": {
    label: "Temporary uncertainty",
    roomLine: "Not knowing yet is still a coordinate on the map.",
  },
  "overfull-room": {
    label: "Overfull room-state",
    roomLine: "Surfaces honest about holding more than one life at once.",
  },
};

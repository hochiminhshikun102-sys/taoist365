export interface FlowInteractionStep {
  id: string;
  stage: "arrival" | "selection" | "reveal" | "pause" | "continuation";
  pacing: "slow" | "steady";
  stepGoal: string;
  uiIntent: string;
}

export interface FlowInteractionFlow {
  name: string;
  steps: FlowInteractionStep[];
}

export const drawLotFlow: FlowInteractionFlow = {
  name: "draw-lot-flow",
  steps: [
    {
      id: "arrival",
      stage: "arrival",
      pacing: "slow",
      stepGoal: "settle attention",
      uiIntent: "quiet entry with visual silence",
    },
    {
      id: "selection",
      stage: "selection",
      pacing: "steady",
      stepGoal: "intentional choice",
      uiIntent: "single focused interaction",
    },
    {
      id: "reveal",
      stage: "reveal",
      pacing: "slow",
      stepGoal: "receive guidance calmly",
      uiIntent: "step reveal timing",
    },
  ],
};

export const moonBlockConfirmationFlow: FlowInteractionFlow = {
  name: "moon-block-confirmation-flow",
  steps: [
    {
      id: "arrival",
      stage: "arrival",
      pacing: "slow",
      stepGoal: "soft grounding",
      uiIntent: "minimal cues with breathing space",
    },
    {
      id: "reveal",
      stage: "reveal",
      pacing: "slow",
      stepGoal: "clarify tendency",
      uiIntent: "gentle animation and quiet text hierarchy",
    },
  ],
};

export const guidanceRevealFlow: FlowInteractionFlow = {
  name: "guidance-reveal-flow",
  steps: [
    {
      id: "reveal",
      stage: "reveal",
      pacing: "slow",
      stepGoal: "offer plain insight",
      uiIntent: "staggered reveal with calm cadence",
    },
    {
      id: "pause",
      stage: "pause",
      pacing: "slow",
      stepGoal: "short pause before continuation",
      uiIntent: "between-step spacing",
    },
  ],
};

export const sessionPauseFlow: FlowInteractionFlow = {
  name: "session-pause-flow",
  steps: [
    {
      id: "pause",
      stage: "pause",
      pacing: "slow",
      stepGoal: "leave ordinary spacing before continuation",
      uiIntent: "quiet container with one prompt line",
    },
  ],
};

export const followUpInvitationFlow: FlowInteractionFlow = {
  name: "follow-up-invitation-flow",
  steps: [
    {
      id: "continuation",
      stage: "continuation",
      pacing: "steady",
      stepGoal: "invite gentle continuity",
      uiIntent: "optional next step and healthy boundary note",
    },
  ],
};

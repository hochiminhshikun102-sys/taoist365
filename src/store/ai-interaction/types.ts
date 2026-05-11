export interface AIInteractionState {
  lastPrompt?: string;
  lastResponseId?: string;
  responseSafetyStatus: "unchecked" | "passed" | "blocked";
  activeWorkflow?: string;
}

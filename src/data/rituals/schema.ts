export interface RitualContent {
  id: string;
  title: string;
  intention: string;
  steps: string[];
  safetyNote: string;
}

export const ritualLibrary: RitualContent[] = [];

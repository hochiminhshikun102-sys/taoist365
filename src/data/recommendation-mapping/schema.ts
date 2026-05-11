export interface RecommendationMapping {
  trigger: string;
  emotionalState: string;
  recommendedActionId: string;
  reasonCode: string;
}

export const recommendationMappings: RecommendationMapping[] = [];

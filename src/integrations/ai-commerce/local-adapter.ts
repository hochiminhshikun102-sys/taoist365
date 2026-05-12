import {
  generateAiMediaPlan,
  generateAiProductDraft,
  generateBrowserAirNormalization,
  generateHomepageSuggestions,
} from "@/config/ai-commerce-runtime";
import type { AiCommerceRuntimeAdapter, AiRuntimeContext, AiRuntimeResult } from "@/integrations/ai-commerce/types";

const localModelName = "local-browser-air-commerce-runtime";

function localResult<T>(value: T): AiRuntimeResult<T> {
  return {
    provider: "local",
    model: localModelName,
    source: "local-fallback",
    value,
    notes: ["Local deterministic runtime; replace with a configured model adapter when credentials are present."],
  };
}

export const localAiCommerceAdapter: AiCommerceRuntimeAdapter = {
  provider: "local",
  label: "Local runtime",
  isConfigured() {
    return true;
  },
  async generateProductDraft(input) {
    return localResult(generateAiProductDraft(input));
  },
  async generateMediaPlan(input) {
    return localResult([...generateBrowserAirNormalization(input), ...generateAiMediaPlan(input)]);
  },
  async suggestHomepagePlacement(input) {
    return localResult(generateHomepageSuggestions(input));
  },
};

export function createLocalAiRuntimeContext(): AiRuntimeContext {
  return {
    provider: "local",
    model: localModelName,
  };
}

import { stripeRuntimeReadiness } from "@/integrations/commerce/commerce-runtime";
import { browserAirMediaTargets } from "@/integrations/media-commerce/media-runtime";
import { storageRuntimeReadiness } from "@/integrations/storage-commerce/storage-runtime";

export const aiProviderReadiness = [
  {
    label: "OpenAI runtime",
    state: "Adapter prepared",
    needs: "OPENAI_API_KEY and model selection.",
  },
  {
    label: "Cloudflare AI runtime",
    state: "Adapter prepared",
    needs: "CLOUDFLARE_AI_TOKEN, CLOUDFLARE_ACCOUNT_ID, and model selection.",
  },
  {
    label: "Local model runtime",
    state: "Future endpoint boundary prepared",
    needs: "LOCAL_AI_COMMERCE_ENDPOINT when a local model is available.",
  },
  {
    label: "Local fallback",
    state: "Active now",
    needs: "No external credentials.",
  },
] as const;

export const mediaRuntimeReadiness = browserAirMediaTargets.map((target) => ({
  label: target.purpose,
  state: target.targetAspect,
  needs: target.treatment,
}));

export const storageRuntimeLines = storageRuntimeReadiness;
export const commerceRuntimeLines = stripeRuntimeReadiness;

export const operationalSuggestionRuntimeLines = [
  "Homepage placement uses collection, object, and seasonal context.",
  "Collection suggestions stay object-led, not campaign-led.",
  "Related object graph starts from room use and material relationship.",
  "Seasonal rotation changes without drop mechanics.",
  "Atmosphere balancing lowers pressure before adding content.",
  "Browser Air correction removes shine, urgency, and over-shaped calm.",
] as const;

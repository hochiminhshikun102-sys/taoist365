import { localAiCommerceAdapter } from "@/integrations/ai-commerce/local-adapter";
import type { AiCommerceRuntimeAdapter } from "@/integrations/ai-commerce/types";

export const localModelCommerceAdapter: AiCommerceRuntimeAdapter = {
  ...localAiCommerceAdapter,
  provider: "local-model",
  label: "Future local model runtime",
  isConfigured(context) {
    return Boolean(context.endpoint);
  },
};

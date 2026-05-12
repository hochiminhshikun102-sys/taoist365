import { cloudflareAiCommerceAdapter } from "@/integrations/ai-commerce/cloudflare-adapter";
import { localAiCommerceAdapter } from "@/integrations/ai-commerce/local-adapter";
import { localModelCommerceAdapter } from "@/integrations/ai-commerce/local-model-adapter";
import { openAiCommerceAdapter } from "@/integrations/ai-commerce/openai-adapter";
import type { AiCommerceRuntimeAdapter, AiRuntimeContext, AiRuntimeProvider } from "@/integrations/ai-commerce/types";

export const aiCommerceAdapters: readonly AiCommerceRuntimeAdapter[] = [
  openAiCommerceAdapter,
  cloudflareAiCommerceAdapter,
  localModelCommerceAdapter,
  localAiCommerceAdapter,
] as const;

export function resolveAiCommerceAdapter(provider: AiRuntimeProvider): AiCommerceRuntimeAdapter {
  return aiCommerceAdapters.find((adapter) => adapter.provider === provider) ?? localAiCommerceAdapter;
}

export function resolveAiCommerceContext(env: Record<string, string | undefined> = {}): AiRuntimeContext {
  const provider = (env.AI_COMMERCE_PROVIDER as AiRuntimeProvider | undefined) ?? "local";

  if (provider === "openai") {
    return {
      provider,
      apiKey: env.OPENAI_API_KEY,
      model: env.OPENAI_COMMERCE_MODEL,
    };
  }

  if (provider === "cloudflare") {
    return {
      provider,
      apiKey: env.CLOUDFLARE_AI_TOKEN,
      accountId: env.CLOUDFLARE_ACCOUNT_ID,
      model: env.CLOUDFLARE_AI_MODEL,
    };
  }

  if (provider === "local-model") {
    return {
      provider,
      endpoint: env.LOCAL_AI_COMMERCE_ENDPOINT,
      model: env.LOCAL_AI_COMMERCE_MODEL,
    };
  }

  return {
    provider: "local",
  };
}

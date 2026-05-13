import type { AiHomepageSuggestion, AiMediaSuggestion } from "@/config/ai-commerce-runtime";
import {
  generateAiMediaPlan,
  generateAiProductDraft,
  generateBrowserAirNormalization,
  generateHomepageSuggestions,
} from "@/config/ai-commerce-runtime";
import type { AiCommerceRuntimeAdapter, AiRuntimeContext, AiRuntimeResult } from "@/integrations/ai-commerce/types";

const defaultCloudflareModel = "@cf/meta/llama-3.1-8b-instruct";

function cloudflareEndpoint(context: AiRuntimeContext) {
  if (!context.accountId) {
    return null;
  }

  const model = encodeURIComponent(context.model ?? defaultCloudflareModel);
  return context.endpoint ?? `https://api.cloudflare.com/client/v4/accounts/${context.accountId}/ai/run/${model}`;
}

async function runCloudflareText(input: string, context: AiRuntimeContext): Promise<string | null> {
  const endpoint = cloudflareEndpoint(context);

  if (!endpoint || !context.apiKey) {
    return null;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${context.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: input }),
  });

  if (!response.ok) {
    return null;
  }

  const json = (await response.json()) as { result?: { response?: string } };
  return json.result?.response ?? null;
}

function result<T>(value: T, context: AiRuntimeContext, source: AiRuntimeResult<T>["source"], notes: readonly string[]) {
  return {
    provider: "cloudflare" as const,
    model: context.model ?? defaultCloudflareModel,
    source,
    value,
    notes,
  };
}

export const cloudflareAiCommerceAdapter: AiCommerceRuntimeAdapter = {
  provider: "cloudflare",
  label: "Cloudflare Workers AI runtime",
  isConfigured(context) {
    return Boolean(context.apiKey && context.accountId);
  },
  async generateProductDraft(input, context) {
    const modelText = await runCloudflareText(
      [
        "Return a concise Reverent Inquiry product draft as JSON-like text.",
        "Keep it restrained, clear, and low-pressure.",
        `Instruction: ${input.prompt}`,
        `Media: ${input.mediaName ?? "none"}`,
      ].join("\n"),
      context,
    );
    const fallback = generateAiProductDraft(input);

    return result(
      modelText ? { ...fallback, atmosphereLine: modelText.slice(0, 180) } : fallback,
      context,
      modelText ? "real-model" : "local-fallback",
      modelText ? ["Cloudflare model response used for atmosphere line refinement."] : ["Cloudflare adapter not configured or returned no text."],
    );
  },
  async generateMediaPlan(input, context) {
    return result<readonly AiMediaSuggestion[]>(
      [...generateBrowserAirNormalization(input), ...generateAiMediaPlan(input)],
      context,
      "local-fallback",
      ["Workers AI text boundary is ready; media generation needs selected model and storage binding."],
    );
  },
  async suggestHomepagePlacement(input, context) {
    return result<readonly AiHomepageSuggestion[]>(generateHomepageSuggestions(input), context, "local-fallback", [
      "Homepage placement remains deterministic until the orchestration model is configured.",
    ]);
  },
};

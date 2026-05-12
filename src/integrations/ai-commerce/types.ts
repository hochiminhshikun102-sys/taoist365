import type {
  AiHomepageSuggestion,
  AiMediaSuggestion,
  AiProductDraft,
  AiUploadInput,
} from "@/config/ai-commerce-runtime";

export type AiRuntimeProvider = "local" | "openai" | "cloudflare" | "local-model";

export type AiRuntimeContext = {
  provider: AiRuntimeProvider;
  model?: string;
  apiKey?: string;
  accountId?: string;
  endpoint?: string;
};

export type AiRuntimeResult<T> = {
  provider: AiRuntimeProvider;
  model: string;
  source: "real-model" | "local-fallback";
  value: T;
  notes: readonly string[];
};

export type AiCommerceRuntimeAdapter = {
  provider: AiRuntimeProvider;
  label: string;
  isConfigured(context: AiRuntimeContext): boolean;
  generateProductDraft(input: AiUploadInput, context: AiRuntimeContext): Promise<AiRuntimeResult<AiProductDraft>>;
  generateMediaPlan(input: AiUploadInput, context: AiRuntimeContext): Promise<AiRuntimeResult<readonly AiMediaSuggestion[]>>;
  suggestHomepagePlacement(
    input: AiUploadInput,
    context: AiRuntimeContext,
  ): Promise<AiRuntimeResult<readonly AiHomepageSuggestion[]>>;
};

export type RuntimeJsonEnvelope<T> = {
  value: T;
  notes?: readonly string[];
};

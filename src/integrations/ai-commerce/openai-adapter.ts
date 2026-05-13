import type {
  AiHomepageSuggestion,
  AiMediaSuggestion,
  AiProductDraft,
  AiUploadInput,
} from "@/config/ai-commerce-runtime";
import {
  generateAiMediaPlan,
  generateAiProductDraft,
  generateBrowserAirNormalization,
  generateHomepageSuggestions,
} from "@/config/ai-commerce-runtime";
import type {
  AiCommerceRuntimeAdapter,
  AiRuntimeContext,
  AiRuntimeResult,
  RuntimeJsonEnvelope,
} from "@/integrations/ai-commerce/types";

const defaultOpenAiModel = "gpt-5.2";
const responsesEndpoint = "https://api.openai.com/v1/responses";

const productDraftSchema = {
  type: "object",
  additionalProperties: false,
  required: ["value", "notes"],
  properties: {
    value: {
      type: "object",
      additionalProperties: false,
      required: [
        "title",
        "subtitle",
        "atmosphereLine",
        "materials",
        "dimensions",
        "placement",
        "shipping",
        "collection",
        "tags",
        "relatedObjectIds",
        "featuredImage",
        "detailSections",
      ],
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        atmosphereLine: { type: "string" },
        materials: { type: "string" },
        dimensions: { type: "string" },
        placement: { type: "string" },
        shipping: { type: "string" },
        collection: { enum: ["wind-objects", "quiet-desk", "ritual-objects", "seasonal-collections"] },
        tags: { type: "array", items: { type: "string" } },
        relatedObjectIds: { type: "array", items: { type: "string" } },
        featuredImage: { type: "string" },
        detailSections: { type: "array", items: { type: "string" } },
      },
    },
    notes: { type: "array", items: { type: "string" } },
  },
} as const;

function buildInstruction(task: string, input: AiUploadInput) {
  return [
    "You support Reverent Inquiry quiet commerce operations.",
    "Generate restrained operational commerce output.",
    "Avoid hype, urgency, conversion pressure, and marketplace language.",
    "Keep Browser Air: off-white, warm mineral gray, linen, soft stone, quiet wood, window light.",
    `Task: ${task}`,
    `Human instruction: ${input.prompt}`,
    `Media name: ${input.mediaName ?? "none"}`,
    `Media kind: ${input.mediaKind ?? "unknown"}`,
  ].join("\n");
}

function extractOutputText(response: unknown): string | null {
  if (!response || typeof response !== "object") {
    return null;
  }

  const maybeOutputText = (response as { output_text?: unknown }).output_text;
  if (typeof maybeOutputText === "string") {
    return maybeOutputText;
  }

  return null;
}

async function createStructuredResponse<T>(
  input: AiUploadInput,
  context: AiRuntimeContext,
  task: string,
  schema: object,
): Promise<RuntimeJsonEnvelope<T> | null> {
  if (!context.apiKey) {
    return null;
  }

  const response = await fetch(context.endpoint ?? responsesEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${context.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: context.model ?? defaultOpenAiModel,
      input: buildInstruction(task, input),
      text: {
        format: {
          type: "json_schema",
          name: "taoist365_commerce_runtime",
          strict: true,
          schema,
        },
      },
    }),
  });

  if (!response.ok) {
    return null;
  }

  const json = (await response.json()) as unknown;
  const outputText = extractOutputText(json);

  if (!outputText) {
    return null;
  }

  return JSON.parse(outputText) as RuntimeJsonEnvelope<T>;
}

function result<T>(value: T, context: AiRuntimeContext, source: AiRuntimeResult<T>["source"], notes: readonly string[]) {
  return {
    provider: "openai" as const,
    model: context.model ?? defaultOpenAiModel,
    source,
    value,
    notes,
  };
}

export const openAiCommerceAdapter: AiCommerceRuntimeAdapter = {
  provider: "openai",
  label: "OpenAI Responses runtime",
  isConfigured(context) {
    return Boolean(context.apiKey);
  },
  async generateProductDraft(input, context) {
    const modelResult = await createStructuredResponse<AiProductDraft>(input, context, "Generate product upload draft.", productDraftSchema);

    if (modelResult) {
      return result(modelResult.value, context, "real-model", modelResult.notes ?? []);
    }

    return result(generateAiProductDraft(input), context, "local-fallback", ["OpenAI adapter not configured or returned no structured value."]);
  },
  async generateMediaPlan(input, context) {
    const fallback = [...generateBrowserAirNormalization(input), ...generateAiMediaPlan(input)];
    return result<readonly AiMediaSuggestion[]>(fallback, context, "local-fallback", [
      "Media plan schema is ready; image and video generation will use provider-specific media endpoints after credentials are connected.",
    ]);
  },
  async suggestHomepagePlacement(input, context) {
    return result<readonly AiHomepageSuggestion[]>(generateHomepageSuggestions(input), context, "local-fallback", [
      "Homepage placement suggestions currently use the local stabilizing runtime.",
    ]);
  },
};

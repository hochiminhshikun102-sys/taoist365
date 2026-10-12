/**
 * Minimal OA Publish → object-intake bridge (R3A).
 * Calls existing Pages Functions only. No go-live publish. No OpenAI secrets.
 */

export type PublishBridgeAsset = {
  id: string;
  name: string;
  url: string;
  type: string;
};

export type PublishBridgeFields = {
  owner: string;
  title: string;
  description: string;
  currency: string;
  origin: string;
};

export type PublishBridgeSku = {
  name: string;
  price: string;
  stock: string;
};

export type PublishBridgeInput = {
  mode: "photo" | "link" | "manual";
  fields: PublishBridgeFields;
  skus: PublishBridgeSku[];
  assets: PublishBridgeAsset[];
  selectedMainId: string;
  rightsConfirmed: boolean;
};

export type PublishBridgeResult = {
  ok: true;
  intake_id: string;
  intake_no?: string;
  review_id?: string;
  status?: string;
};

export type PublishBridgeError = {
  ok: false;
  step: "validate" | "create" | "media" | "ai-draft" | "submit-review";
  message: string;
  intake_id?: string;
};

export type PublishBridgeOutcome = PublishBridgeResult | PublishBridgeError;

const SERVER_MEDIA_TYPES = new Set([
  "original",
  "normalized",
  "main",
  "detail",
  "scene",
  "pc",
  "mobile",
  "social",
  "motion",
]);

async function readJson(response: Response): Promise<Record<string, unknown>> {
  try {
    return (await response.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

async function assetToFile(asset: PublishBridgeAsset): Promise<File> {
  const response = await fetch(asset.url);
  if (!response.ok) {
    throw new Error(`Unable to read local asset ${asset.name}`);
  }
  const blob = await response.blob();
  const type = blob.type || "image/jpeg";
  return new File([blob], asset.name || `asset-${asset.id}.jpg`, { type });
}

function mapMediaType(type: string, isMain: boolean): string {
  if (isMain) return "main";
  if (SERVER_MEDIA_TYPES.has(type)) return type;
  if (type === "rights") return "original";
  return "detail";
}

export async function submitPublishIntake(
  input: PublishBridgeInput,
  onProgress?: (step: string) => void,
): Promise<PublishBridgeOutcome> {
  if (input.mode === "link") {
    return {
      ok: false,
      step: "validate",
      message: "Link extract is deferred in R3A. Use photo or manual mode.",
    };
  }
  if (!input.rightsConfirmed) {
    return { ok: false, step: "validate", message: "Confirm media rights before submit-review." };
  }
  if (!input.fields.title.trim()) {
    return { ok: false, step: "validate", message: "Title is required." };
  }
  if (!input.selectedMainId) {
    return { ok: false, step: "validate", message: "Select a main image before submit-review." };
  }

  const main = input.assets.find((a) => a.id === input.selectedMainId);
  if (!main) {
    return { ok: false, step: "validate", message: "Main image asset is missing." };
  }

  const price = input.skus[0]?.price?.trim() || "";
  const body = {
    source_type: "admin_upload",
    source_platform: "manual",
    source_url: "",
    submitted_by: "admin-os",
    buyer_id: "",
    member_id: "",
    referral_code: "",
    country: input.fields.origin || "",
    original_title: input.fields.title.trim(),
    original_description: input.fields.description || "",
    original_price: price,
    currency: (input.fields.currency || "USD").toUpperCase(),
    inventory: Number.parseInt(input.skus[0]?.stock || "1", 10) || 1,
  };

  onProgress?.("create");
  let createResponse: Response;
  try {
    createResponse = await fetch("/api/object-intakes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return {
      ok: false,
      step: "create",
      message: "Network error creating intake. Pages Functions may be unavailable in this host.",
    };
  }

  const createData = await readJson(createResponse);
  if (!createResponse.ok) {
    return {
      ok: false,
      step: "create",
      message: String(createData.error || `Create intake failed (${createResponse.status}).`),
    };
  }

  const intakeId = String(createData.intake_id || "");
  if (!intakeId) {
    return { ok: false, step: "create", message: "Create response missing intake_id." };
  }

  const ordered = [
    main,
    ...input.assets.filter((a) => a.id !== main.id && a.type !== "rights"),
  ];

  for (const asset of ordered) {
    onProgress?.(`media:${mapMediaType(asset.type, asset.id === main.id)}`);
    let file: File;
    try {
      file = await assetToFile(asset);
    } catch (error) {
      return {
        ok: false,
        step: "media",
        message: error instanceof Error ? error.message : "Failed to read local image for upload.",
        intake_id: intakeId,
      };
    }

    const form = new FormData();
    form.set("media_type", mapMediaType(asset.type, asset.id === main.id));
    form.append("files", file);

    let mediaResponse: Response;
    try {
      mediaResponse = await fetch(`/api/object-intakes/${intakeId}/media`, {
        method: "POST",
        body: form,
      });
    } catch {
      return {
        ok: false,
        step: "media",
        message: "Network error uploading media. Pages Functions may be unavailable.",
        intake_id: intakeId,
      };
    }

    const mediaData = await readJson(mediaResponse);
    if (!mediaResponse.ok) {
      return {
        ok: false,
        step: "media",
        message: String(mediaData.error || `Media upload failed (${mediaResponse.status}).`),
        intake_id: intakeId,
      };
    }
  }

  onProgress?.("ai-draft");
  let draftResponse: Response;
  try {
    draftResponse = await fetch(`/api/object-intakes/${intakeId}/ai-draft`, { method: "POST" });
  } catch {
    return {
      ok: false,
      step: "ai-draft",
      message: "Network error calling local ai-draft.",
      intake_id: intakeId,
    };
  }
  const draftData = await readJson(draftResponse);
  if (!draftResponse.ok) {
    return {
      ok: false,
      step: "ai-draft",
      message: String(draftData.error || `Local ai-draft failed (${draftResponse.status}).`),
      intake_id: intakeId,
    };
  }

  onProgress?.("submit-review");
  let reviewResponse: Response;
  try {
    reviewResponse = await fetch(`/api/object-intakes/${intakeId}/submit-review`, {
      method: "POST",
    });
  } catch {
    return {
      ok: false,
      step: "submit-review",
      message: "Network error on submit-review.",
      intake_id: intakeId,
    };
  }
  const reviewData = await readJson(reviewResponse);
  if (!reviewResponse.ok) {
    return {
      ok: false,
      step: "submit-review",
      message: String(reviewData.error || `Submit-review failed (${reviewResponse.status}).`),
      intake_id: intakeId,
    };
  }

  return {
    ok: true,
    intake_id: intakeId,
    intake_no: reviewData.intake_no ? String(reviewData.intake_no) : String(createData.intake_no || ""),
    review_id: reviewData.review_id ? String(reviewData.review_id) : undefined,
    status: reviewData.status ? String(reviewData.status) : undefined,
  };
}

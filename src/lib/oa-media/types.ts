export type MediaSource = "studio_capture" | "supplier_pack" | "owner_upload" | "ai_derivative" | "legacy_import";

export type RightsStatus = "unknown" | "claimed" | "evidenced" | "cleared" | "blocked";

export type ReviewStatus = "not_submitted" | "in_review" | "approved" | "rejected" | "expired" | "unknown";

export type AssetKind = "original_asset" | "public_asset" | "ai_derivative" | "rights_evidence";

export type MediaQueueTag =
  | "all"
  | "needs_rights"
  | "awaiting_review"
  | "public_ready"
  | "ai_hold"
  | "orphaned";

export type OaMediaRecord = {
  media_id: string;
  bundle_ref: string;
  object_sku: string;
  title: string;
  source: MediaSource;
  asset_kind: AssetKind;
  rights_status: RightsStatus;
  review_status: ReviewStatus;
  is_original: boolean;
  is_public_asset: boolean;
  is_ai_derivative: boolean;
  has_rights_evidence: boolean;
  intake_ref: string;
  compliance_note: string;
  updated_at: string;
  queue_tags: MediaQueueTag[];
  preview_href_blocked?: boolean;
  source_scope?: string;
  source_status?: string;
  mime_type?: string;
  media_slot?: string;
  preview_path?: string;
  preview_kind?: "image" | "video" | "unknown";
};

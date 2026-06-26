export type ObjectIntakeStatus =
  | "draft"
  | "uploaded"
  | "ai_draft_pending"
  | "ai_draft_ready"
  | "review_pending"
  | "revision_required"
  | "approved"
  | "rejected"
  | "published";

export type ObjectIntake = {
  id: string;
  intake_no: string;
  source_type: string;
  identity_scope?: string;
  entry_surface?: string;
  supply_program?: string;
  commerce_channel?: string;
  goods_condition?: string;
  source_label?: string;
  source_note?: string;
  reward_eligible?: boolean;
  professional_buyer_required?: boolean;
  member_supply_locked?: boolean;
  source_platform: string;
  source_url: string;
  source_snapshot?: {
    raw_line?: string;
    import_mode?: string;
    source_usage_policy?: string;
    publish_policy?: string;
    detected_platform?: string;
    source_item_id?: string;
    canonical_source_url?: string;
    source_parse_status?: string;
    parser_version?: string;
    rights_review_required?: boolean;
    source_capture_status?: string;
    legal_note?: string;
  } | null;
  media_rights_status?: string;
  media_transform_required?: boolean;
  air_engine_policy?: string;
  submitted_by: string;
  buyer_id: string;
  member_id?: string;
  referral_code?: string;
  country: string;
  original_title: string;
  original_description: string;
  original_price: string;
  currency: string;
  category_hint: string;
  supplier: string;
  location: string;
  logistics_method: string;
  inventory: number;
  is_one_of_one: boolean;
  air_engine_status: "not_started" | "pending" | "processing" | "ready" | "failed";
  status: ObjectIntakeStatus;
  object_id?: string;
  created_at: string;
  updated_at: string;
};

export type ObjectMedia = {
  id: string;
  intake_id: string;
  object_id: string;
  media_type: string;
  file_url: string;
  data_url?: string;
  storage_key: string;
  mime_type: string;
  status: string;
  sort_order: number;
  created_at: string;
};

export type ObjectAiDraft = {
  id: string;
  intake_id: string;
  draft_title: string;
  draft_subtitle: string;
  draft_description: string;
  material: string;
  size_text: string;
  category: string;
  source_type?: string;
  identity_scope?: string;
  entry_surface?: string;
  supply_program?: string;
  commerce_channel?: string;
  goods_condition?: string;
  tags: string[];
  seo_title: string;
  seo_description: string;
  geo_summary: string;
  product_story: string;
  placement_suggestion: string;
  price_suggestion: string;
  shipping_note: string;
  risk_notes: string;
  confidence_score: number;
};

export type PublishedObject = {
  object_id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  currency: string;
  inventory: number;
  category: string;
  tags: string[];
  primary_image_url: string;
  published_at: string;
};

export type EnrichedIntake = {
  intake: ObjectIntake;
  media: ObjectMedia[];
  draft: ObjectAiDraft | null;
  review: Record<string, string> | null;
  object: PublishedObject | null;
  thumbnail_url: string;
  audit_logs: Array<Record<string, string>>;
};

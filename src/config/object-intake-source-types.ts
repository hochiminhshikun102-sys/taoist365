export type ObjectIntakeSourceType =
  | "admin_upload"
  | "boss_upload"
  | "external_link"
  | "supplier_batch"
  | "buyer_upload"
  | "windkeep_member"
  | "member_consignment"
  | "neighbor_referral";

export type ObjectIntakeIdentityScope = "admin" | "supplier" | "wind_seeker" | "windkeep_member" | "windkeep_referral";
export type ObjectIntakeEntrySurface = "admin_os" | "wind_seeker" | "member_center";
export type ObjectIntakeSupplyProgram = "commerce" | "supplier" | "wind_seeker" | "windkeep";
export type ObjectIntakeCommerceChannel = "commerce_new" | "windkeep_secondhand";
export type ObjectIntakeGoodsCondition = "new" | "preowned";

export type ObjectIntakeSourceDefinition = {
  type: ObjectIntakeSourceType;
  label: string;
  identity_scope: ObjectIntakeIdentityScope;
  entry_surface: ObjectIntakeEntrySurface;
  supply_program: ObjectIntakeSupplyProgram;
  commerce_channel: ObjectIntakeCommerceChannel;
  goods_condition: ObjectIntakeGoodsCondition;
  reward_eligible: boolean;
  professional_buyer_required: boolean;
  member_supply_locked: boolean;
  note: string;
};

export const objectIntakeSourceDefinitions: readonly ObjectIntakeSourceDefinition[] = [
  {
    type: "admin_upload",
    label: "OA admin upload",
    identity_scope: "admin",
    entry_surface: "admin_os",
    supply_program: "commerce",
    commerce_channel: "commerce_new",
    goods_condition: "new",
    reward_eligible: false,
    professional_buyer_required: false,
    member_supply_locked: false,
    note: "OA operations product intake.",
  },
  {
    type: "boss_upload",
    label: "Boss upload",
    identity_scope: "admin",
    entry_surface: "admin_os",
    supply_program: "commerce",
    commerce_channel: "commerce_new",
    goods_condition: "new",
    reward_eligible: false,
    professional_buyer_required: false,
    member_supply_locked: false,
    note: "Owner manual product intake.",
  },
  {
    type: "external_link",
    label: "External link",
    identity_scope: "admin",
    entry_surface: "admin_os",
    supply_program: "commerce",
    commerce_channel: "commerce_new",
    goods_condition: "new",
    reward_eligible: false,
    professional_buyer_required: false,
    member_supply_locked: false,
    note: "External source link intake. First version stores the link only.",
  },
  {
    type: "supplier_batch",
    label: "Supplier batch",
    identity_scope: "supplier",
    entry_surface: "admin_os",
    supply_program: "supplier",
    commerce_channel: "commerce_new",
    goods_condition: "new",
    reward_eligible: false,
    professional_buyer_required: false,
    member_supply_locked: false,
    note: "Supplier batch material intake.",
  },
  {
    type: "buyer_upload",
    label: "Wind Seeker buyer upload",
    identity_scope: "wind_seeker",
    entry_surface: "wind_seeker",
    supply_program: "wind_seeker",
    commerce_channel: "commerce_new",
    goods_condition: "new",
    reward_eligible: false,
    professional_buyer_required: true,
    member_supply_locked: false,
    note: "Professional Wind Seeker entry for new-goods commerce.",
  },
  {
    type: "windkeep_member",
    label: "Windkeep member supply",
    identity_scope: "windkeep_member",
    entry_surface: "member_center",
    supply_program: "windkeep",
    commerce_channel: "windkeep_secondhand",
    goods_condition: "preowned",
    reward_eligible: true,
    professional_buyer_required: false,
    member_supply_locked: true,
    note: "Future Windkeep secondhand continuity entry inside the account center.",
  },
  {
    type: "member_consignment",
    label: "Member consignment",
    identity_scope: "windkeep_member",
    entry_surface: "member_center",
    supply_program: "windkeep",
    commerce_channel: "windkeep_secondhand",
    goods_condition: "preowned",
    reward_eligible: true,
    professional_buyer_required: false,
    member_supply_locked: true,
    note: "Future member consignment entry inside the account center.",
  },
  {
    type: "neighbor_referral",
    label: "Neighbor referral",
    identity_scope: "windkeep_referral",
    entry_surface: "member_center",
    supply_program: "windkeep",
    commerce_channel: "windkeep_secondhand",
    goods_condition: "preowned",
    reward_eligible: true,
    professional_buyer_required: false,
    member_supply_locked: true,
    note: "Future friend, neighbor, and referral supply entry.",
  },
];

export const objectIntakeSourceTypes = objectIntakeSourceDefinitions.map((item) => item.type);

export const windSeekerSourceTypes: readonly ObjectIntakeSourceType[] = ["buyer_upload"];

export const windkeepMemberSupplySourceTypes: readonly ObjectIntakeSourceType[] = [
  "windkeep_member",
  "member_consignment",
  "neighbor_referral",
];

export const futureMemberCenterSupplyEntry = {
  id: "windkeep-supply",
  label: "Windkeep Supply",
  plannedHref: "/account/windkeep-supply",
  entry_surface: "member_center" as const,
  supply_program: "windkeep" as const,
  commerce_channel: "windkeep_secondhand" as const,
  goods_condition: "preowned" as const,
  allowedSourceTypes: windkeepMemberSupplySourceTypes,
  guardrail: "Windkeep member supply is a secondhand continuity channel, separate from new-goods commerce.",
};

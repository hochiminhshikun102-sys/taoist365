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

export type ObjectIntakeSourceDefinition = {
  type: ObjectIntakeSourceType;
  label: string;
  identity_scope: ObjectIntakeIdentityScope;
  entry_surface: ObjectIntakeEntrySurface;
  supply_program: ObjectIntakeSupplyProgram;
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
    reward_eligible: false,
    professional_buyer_required: false,
    member_supply_locked: false,
    note: "OA后台运营入库。",
  },
  {
    type: "boss_upload",
    label: "Boss upload",
    identity_scope: "admin",
    entry_surface: "admin_os",
    supply_program: "commerce",
    reward_eligible: false,
    professional_buyer_required: false,
    member_supply_locked: false,
    note: "老板手动入库。",
  },
  {
    type: "external_link",
    label: "External link",
    identity_scope: "admin",
    entry_surface: "admin_os",
    supply_program: "commerce",
    reward_eligible: false,
    professional_buyer_required: false,
    member_supply_locked: false,
    note: "淘宝、天猫、1688等链接导入；第一版只保存链接。",
  },
  {
    type: "supplier_batch",
    label: "Supplier batch",
    identity_scope: "supplier",
    entry_surface: "admin_os",
    supply_program: "supplier",
    reward_eligible: false,
    professional_buyer_required: false,
    member_supply_locked: false,
    note: "供应商批量资料入口。",
  },
  {
    type: "buyer_upload",
    label: "Wind Seeker buyer upload",
    identity_scope: "wind_seeker",
    entry_surface: "wind_seeker",
    supply_program: "wind_seeker",
    reward_eligible: false,
    professional_buyer_required: true,
    member_supply_locked: false,
    note: "全球买手专业端入口，不能给 Windkeep 普通会员使用。",
  },
  {
    type: "windkeep_member",
    label: "Windkeep member supply",
    identity_scope: "windkeep_member",
    entry_surface: "member_center",
    supply_program: "windkeep",
    reward_eligible: true,
    professional_buyer_required: false,
    member_supply_locked: true,
    note: "未来会员中心里的 Windkeep 供应入口。",
  },
  {
    type: "member_consignment",
    label: "Member consignment",
    identity_scope: "windkeep_member",
    entry_surface: "member_center",
    supply_program: "windkeep",
    reward_eligible: true,
    professional_buyer_required: false,
    member_supply_locked: true,
    note: "未来会员寄售入口。",
  },
  {
    type: "neighbor_referral",
    label: "Neighbor referral",
    identity_scope: "windkeep_referral",
    entry_surface: "member_center",
    supply_program: "windkeep",
    reward_eligible: true,
    professional_buyer_required: false,
    member_supply_locked: true,
    note: "未来朋友、邻居、裂变推荐入口。",
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
  allowedSourceTypes: windkeepMemberSupplySourceTypes,
  guardrail: "Windkeep会员供应入口嵌入会员中心，不跳转全球买手端。",
};

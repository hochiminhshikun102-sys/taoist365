import type { CommerceReadonlyModule } from "./commerceReadonlyTypes";

/**
 * TEST_ONLY UI fixtures for Commerce A readonly wiring.
 * Not Formal Provider. Not live orders/inventory/logistics.
 * Inspired by OA overviewFixture patterns; Account order mocks were inventoried
 * but intentionally NOT imported (Account Center freeze).
 */
export const COMMERCE_READONLY_META = {
  data_source: "TEST_ONLY_UI_FIXTURE",
  not_formal_provider: true,
  mode: "READONLY_PREVIEW",
  provider_status: "Provider not connected",
} as const;

export const COMMERCE_READONLY_MODULES: Record<string, CommerceReadonlyModule> = {
  commerce: {
    id: "commerce",
    activeKey: "co",
    en: "CO",
    zh: "商业订单",
    descriptionEn:
      "Readonly commerce and order carrier. Lists use TEST_ONLY fixtures until Formal Provider wiring.",
    descriptionZh: "商业与订单只读承载。列表使用测试夹具，正式 Provider 接线前不可写。",
    canonicalDomain: "02 CO",
    summaries: [
      { label: "Open orders · 未完结订单", value: "18", hint: "TEST_ONLY count" },
      { label: "Awaiting fulfill · 待履约", value: "7", hint: "TEST_ONLY count" },
      { label: "Hold / review · 挂起审核", value: "3", hint: "TEST_ONLY count" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "ORD-TEST-1042",
        primary: "ORD-TEST-1042 · Tea Set A",
        secondary: "Market US · Locale en",
        status: "awaiting_fulfill",
        asOf: "2026-10-12 09:18",
      },
      {
        id: "ORD-TEST-1041",
        primary: "ORD-TEST-1041 · Incense B",
        secondary: "Market EU · Locale en",
        status: "paid",
        asOf: "2026-10-12 08:41",
      },
      {
        id: "ORD-TEST-1038",
        primary: "ORD-TEST-1038 · Book C",
        secondary: "Market JP · Locale ja",
        status: "hold_review",
        asOf: "2026-10-11 21:05",
      },
    ],
    listTitle: "Order snapshot · 订单快照（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live commerce Provider rows connected. Fixture list above is preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · Formal commerce source not wired. Retry disabled.",
  },
  operations: {
    id: "operations",
    activeKey: "operations",
    en: "Operations",
    zh: "运营",
    descriptionEn:
      "Readonly operations queue carrier for Commerce A. No member write actions.",
    descriptionZh: "Commerce A 运营队列只读承载。无会员写操作。",
    canonicalDomain: "03 Operations",
    summaries: [
      { label: "Intake pending · 入库待审", value: "5", hint: "TEST_ONLY count" },
      { label: "Member flags · 会员标记", value: "2", hint: "TEST_ONLY count" },
      { label: "Content holds · 内容挂起", value: "1", hint: "TEST_ONLY count" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "OPS-TEST-221",
        primary: "Intake batch #221 · 入库批次",
        secondary: "Owner 03 Operations",
        status: "pending_review",
        asOf: "2026-10-12 10:02",
      },
      {
        id: "OPS-TEST-218",
        primary: "Entitlement sync watch · 权益同步观察",
        secondary: "Owner 03A Member Ops",
        status: "watch",
        asOf: "2026-10-12 07:55",
      },
      {
        id: "OPS-TEST-210",
        primary: "Member content hold · 会员内容挂起",
        secondary: "Owner 03D",
        status: "on_hold",
        asOf: "2026-10-11 19:20",
      },
    ],
    listTitle: "Operations queue · 运营队列（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live operations Provider queue connected. Fixture rows are preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · Operations source not wired. Actions remain disabled.",
  },
  logistics: {
    id: "logistics",
    activeKey: "logistics",
    en: "Logistics",
    zh: "物流",
    descriptionEn:
      "Readonly logistics and fulfillment carrier. No shipment mutation in this round.",
    descriptionZh: "物流与履约只读承载。本轮不做运单变更。",
    canonicalDomain: "09 Logistics",
    summaries: [
      { label: "In transit · 运输中", value: "11", hint: "TEST_ONLY count" },
      { label: "Label ready · 面单就绪", value: "4", hint: "TEST_ONLY count" },
      { label: "Exception · 异常件", value: "2", hint: "TEST_ONLY count" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "FUL-TEST-880",
        primary: "FUL-TEST-880 · USPS Ground",
        secondary: "Order ORD-TEST-1042",
        status: "in_transit",
        asOf: "2026-10-12 11:10",
      },
      {
        id: "FUL-TEST-877",
        primary: "FUL-TEST-877 · DHL Express",
        secondary: "Order ORD-TEST-1041",
        status: "label_ready",
        asOf: "2026-10-12 09:40",
      },
      {
        id: "FUL-TEST-865",
        primary: "FUL-TEST-865 · Exception scan",
        secondary: "Order ORD-TEST-1029",
        status: "exception",
        asOf: "2026-10-11 16:33",
      },
    ],
    listTitle: "Fulfillment snapshot · 履约快照（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live logistics Provider shipments connected. Fixture rows are preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · Logistics source not wired. Tracking actions disabled.",
  },
  "supply-chain": {
    id: "supply-chain",
    activeKey: "supply_chain",
    en: "Supply Chain",
    zh: "供应链",
    descriptionEn:
      "Readonly supply-chain and warehouse carrier. Inventory writes are forbidden here.",
    descriptionZh: "供应链与仓储只读承载。此处禁止库存写入。",
    canonicalDomain: "10 Supply Chain",
    summaries: [
      { label: "SKU watch · SKU 观察", value: "9", hint: "TEST_ONLY count" },
      { label: "Low stock · 低库存", value: "3", hint: "TEST_ONLY count" },
      { label: "Inbound ETA · 入库预计", value: "2", hint: "TEST_ONLY batches" },
      { label: "Provider link · 接线状态", value: "Offline", hint: "Not connected" },
    ],
    rows: [
      {
        id: "SKU-TEST-TEA-A",
        primary: "SKU-TEST-TEA-A · Tea Set A",
        secondary: "Warehouse WH-TEST-01 · on_hand 12",
        status: "low_stock",
        asOf: "2026-10-12 08:00",
      },
      {
        id: "SKU-TEST-INC-B",
        primary: "SKU-TEST-INC-B · Incense B",
        secondary: "Warehouse WH-TEST-01 · on_hand 86",
        status: "healthy",
        asOf: "2026-10-12 08:00",
      },
      {
        id: "INB-TEST-44",
        primary: "Inbound #44 · 入库预计",
        secondary: "ETA 2026-10-15 · 120 units",
        status: "inbound_eta",
        asOf: "2026-10-11 14:12",
      },
    ],
    listTitle: "Inventory snapshot · 库存快照（只读）",
    emptyTitle: "Empty state · 空状态",
    emptyBody: "No live supply-chain Provider stock connected. Fixture rows are preview-only.",
    errorTitle: "Error state · 错误状态",
    errorBody: "Provider unavailable · Supply source not wired. Adjust/stock writes disabled.",
  },
};

export function getCommerceReadonlyModule(id: string): CommerceReadonlyModule | undefined {
  return COMMERCE_READONLY_MODULES[id];
}

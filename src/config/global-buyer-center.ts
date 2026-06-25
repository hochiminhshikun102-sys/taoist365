export type BuyerProductStatus = "Live" | "In Review" | "Needs Edit" | "Archived";
export type BuyerCaseStatus = "Pending" | "In Progress" | "Resolved" | "Rejected";

export const buyerTone = {
  shell: "bg-[#F5F6F8] text-[#2D333A]",
  panel: "border border-[#D9DCE0] bg-white shadow-[0_18px_50px_rgba(45,51,58,0.08)]",
  mutedPanel: "border border-[#D9DCE0] bg-[#EBEDEF]",
  accent: "bg-[#947A66] text-white",
  accentSoft: "bg-[#A88C75]/12 text-[#6B5140]",
  textMuted: "text-[#6B7280]",
} as const;

export const globalBuyerDepositPolicy = {
  onboardingDepositUsd: 1000,
  onboardingDepositLabel: "$1,000.00",
  onboardingDepositNote: "Fixed onboarding deposit",
} as const;

export const buyerProfile = {
  name: "Wind Seeker",
  id: "B0001258",
  level: "Lv.2 Apprentice Buyer",
  levelZh: "Lv.2 见习买手",
  growth: 620,
  nextGrowth: 1000,
  avatar: "/brand/production/homepage/final-air/vase-flower.webp",
};

export const buyerStats = [
  { label: "Products", labelZh: "商品总数", value: "24", note: "18 live" },
  { label: "In Review", labelZh: "待审核", value: "3", note: "Product review" },
  { label: "Orders", labelZh: "累计订单", value: "126", note: "All orders" },
  { label: "Earnings", labelZh: "累计收益", value: "$12,680.50", note: "$2,680.50 withdrawable" },
  { label: "Buyer Level", labelZh: "买手等级", value: "Lv.2", note: "Apprentice Buyer" },
] as const;

export const mobileTiles = [
  { label: "Capture Product", labelZh: "拍商品", note: "AI assisted listing", href: "#mobile-capture", active: true },
  { label: "My Products", labelZh: "我的商品", note: "24 listed", href: "#mobile-products" },
  { label: "Orders", labelZh: "订单管理", note: "8 to ship", href: "#mobile-shipping" },
  { label: "Earnings", labelZh: "收益中心", note: "$1,268.50", href: "#mobile-settlement" },
  { label: "Messages", labelZh: "消息中心", note: "Platform notices", href: "#mobile-messages", badge: "3" },
  { label: "Help", labelZh: "帮助中心", note: "Buyer guide", href: "#mobile-help" },
] as const;

export const publishSteps = [
  { label: "Capture", labelZh: "拍照上传", note: "Upload product photos" },
  { label: "AI Draft", labelZh: "AI 生成", note: "Title, description, keywords" },
  { label: "Complete Info", labelZh: "补充信息", note: "Condition, price, stock" },
  { label: "Submit Review", labelZh: "提交审核", note: "Send to QS review" },
  { label: "Enter Library", labelZh: "进入产品库", note: "Approved for platform catalog" },
] as const;

export const buyerProducts = [
  { id: "P-1001", title: "Handmade Ceramic Cup", titleZh: "手工陶瓷杯", price: "$128.00", status: "Live" as BuyerProductStatus, views: 266, orders: 18, stock: 6, image: "coffee-cup.webp" },
  { id: "P-1002", title: "Scented Mountain Candle", titleZh: "香氛蜡烛", price: "$98.00", status: "Live" as BuyerProductStatus, views: 189, orders: 12, stock: 12, image: "candle.webp" },
  { id: "P-1003", title: "Handwoven Shoulder Wrap", titleZh: "手工编织披肩", price: "$268.00", status: "In Review" as BuyerProductStatus, views: 0, orders: 0, stock: 2, image: "textile-chair.webp" },
  { id: "P-1004", title: "Vintage Glass Vase", titleZh: "复古玻璃花瓶", price: "$158.00", status: "Needs Edit" as BuyerProductStatus, views: 0, orders: 0, stock: 1, image: "vase-flower.webp" },
  { id: "P-1005", title: "Handmade Purple Clay Teapot", titleZh: "手工紫砂壶", price: "$398.00", status: "Live" as BuyerProductStatus, views: 320, orders: 24, stock: 3, image: "gramophone.webp" },
] as const;

export const buyerOrders = [
  { id: "#12568", product: "Handmade Ceramic Cup", buyer: "Clara M.", amount: "$268.00", state: "To Ship", deadline: "2026-05-23 18:00", tracking: "" },
  { id: "#12564", product: "Scented Mountain Candle", buyer: "Yuki A.", amount: "$98.00", state: "Shipped", deadline: "2026-05-22 20:00", tracking: "DHL-883120" },
  { id: "#12559", product: "Vintage Glass Vase", buyer: "Sophie L.", amount: "$158.00", state: "Logistics Issue", deadline: "2026-05-21 12:00", tracking: "UPS-772810" },
] as const;

export const depositRecords = [
  { id: "D-01", type: "Paid", amount: globalBuyerDepositPolicy.onboardingDepositLabel, state: "Completed", time: "2026-05-12", note: "Onboarding deposit / 入驻保证金" },
  { id: "D-02", type: "Frozen", amount: "$80.00", state: "In Progress", time: "2026-05-16", note: "After-sales dispute hold / 售后暂冻" },
  { id: "D-03", type: "Deducted", amount: "$12.00", state: "Completed", time: "2026-05-18", note: "Late shipping compensation / 延迟发货补偿" },
] as const;

export const afterSalesCases = [
  { id: "AS-204", type: "Refund Request", product: "Handmade Ceramic Cup", amount: "$128.00", status: "Pending" as BuyerCaseStatus, reason: "Buyer reported glaze mark", evidence: "2 images" },
  { id: "AS-198", type: "Return Request", product: "Scented Mountain Candle", amount: "$98.00", status: "In Progress" as BuyerCaseStatus, reason: "Shipping compression", evidence: "Logistics screenshot" },
  { id: "AS-177", type: "Dispute", product: "Vintage Glass Vase", amount: "$158.00", status: "Resolved" as BuyerCaseStatus, reason: "Late delivery", evidence: "Negotiation log" },
] as const;

export const settlementRows = [
  { id: "ST-501", order: "#12568", gross: "$268.00", fee: "$26.80", tax: "$8.20", commission: "$233.00", state: "Pending" },
  { id: "ST-486", order: "#12564", gross: "$98.00", fee: "$9.80", tax: "$3.20", commission: "$85.00", state: "Withdrawable" },
  { id: "ST-472", order: "#12531", gross: "$398.00", fee: "$39.80", tax: "$12.00", commission: "$346.20", state: "Paid Out" },
] as const;

export const riskRows = [
  { id: "R-11", buyer: "Wind Seeker", signal: "Tracking delay", score: "Low", state: "Watching", note: "One order tracking sync delayed" },
  { id: "R-12", buyer: "Wind Seeker", signal: "Dispute rate", score: "Medium", state: "Review", note: "2 after-sales cases in 7 days" },
  { id: "R-13", buyer: "Wind Seeker", signal: "Deposit deduction", score: "Low", state: "Logged", note: "Late shipping compensation $12" },
] as const;

export const rulesLibrary = [
  { group: "Onboarding", groupZh: "入驻规则", title: "Identity verification and buyer approval", version: "v1.4", updated: "2026-05-15" },
  { group: "Product", groupZh: "商品规则", title: "Handmade, vintage, and one-of-one listing rules", version: "v2.1", updated: "2026-05-15" },
  { group: "After-Sales", groupZh: "售后规则", title: "Refund, return, and dispute handling timeline", version: "v1.8", updated: "2026-05-15" },
  { group: "Settlement", groupZh: "结算规则", title: "Commission, platform fee, tax, and payout review", version: "v1.6", updated: "2026-05-15" },
  { group: "Risk", groupZh: "风控规则", title: "False shipping, abnormal listing, and deposit deduction", version: "v1.9", updated: "2026-05-15" },
] as const;

export const notificationSwitches = ["Order alerts", "Review results", "After-sales notices", "Campaign updates", "Risk alerts"] as const;

export type OaNavItem = {
  id: string;
  key: string;
  en: string;
  zh: string;
  canonical: string;
  canonical_domain_id: string;
  owner_domain: string;
  has_submenu: boolean;
};

export type OaSubmenuItem = {
  label: string;
  route: string;
  owner: string;
};

export const NAV_ITEMS: OaNavItem[] = [
  {
    "id": "01",
    "key": "overview",
    "en": "Operations Overview Board",
    "zh": "经营总览看板",
    "canonical": "01 Overview",
    "canonical_domain_id": "01",
    "owner_domain": "01 Overview",
    "has_submenu": false
  },
  {
    "id": "02",
    "key": "products_orders",
    "en": "Products & Orders",
    "zh": "商品与订单",
    "canonical": "02 CO",
    "canonical_domain_id": "02",
    "owner_domain": "02 CO",
    "has_submenu": true
  },
  {
    "id": "03",
    "key": "content_assets",
    "en": "Content & Assets",
    "zh": "内容与素材",
    "canonical": "05 Site",
    "canonical_domain_id": "05",
    "owner_domain": "05 Site (+ 03D Member Content entry only)",
    "has_submenu": true
  },
  {
    "id": "04",
    "key": "users_members",
    "en": "Users & Members",
    "zh": "用户与会员",
    "canonical": "03 Operations",
    "canonical_domain_id": "03",
    "owner_domain": "03 Operations / 03A Member Operations",
    "has_submenu": true
  },
  {
    "id": "05",
    "key": "wind_seeker",
    "en": "Wind Seeker",
    "zh": "Wind Seeker",
    "canonical": "12 GS",
    "canonical_domain_id": "12",
    "owner_domain": "12 GS",
    "has_submenu": false
  },
  {
    "id": "06",
    "key": "windkeep",
    "en": "Windkeep",
    "zh": "Windkeep",
    "canonical": "11 WK",
    "canonical_domain_id": "11",
    "owner_domain": "11 WK",
    "has_submenu": false
  },
  {
    "id": "07",
    "key": "journal",
    "en": "Journal",
    "zh": "Journal",
    "canonical": "03 Operations",
    "canonical_domain_id": "03",
    "owner_domain": "03 Operations / 03D Member Content",
    "has_submenu": false
  },
  {
    "id": "08",
    "key": "marketing",
    "en": "Marketing",
    "zh": "营销投放",
    "canonical": "03 Operations",
    "canonical_domain_id": "03",
    "owner_domain": "03 Operations / 03F Growth & Rewards",
    "has_submenu": false
  },
  {
    "id": "09",
    "key": "seo_geo",
    "en": "SEO / GEO",
    "zh": "SEO / GEO",
    "canonical": "05 Site",
    "canonical_domain_id": "05",
    "owner_domain": "05 Site + 06 GEO (submenu split)",
    "has_submenu": true
  },
  {
    "id": "10",
    "key": "logistics",
    "en": "Logistics",
    "zh": "物流与仓配",
    "canonical": "09 Logistics",
    "canonical_domain_id": "09",
    "owner_domain": "09 Logistics + 10 Supply Chain (submenu split)",
    "has_submenu": true
  },
  {
    "id": "11",
    "key": "after_sales",
    "en": "After-sales",
    "zh": "售后与退款",
    "canonical": "02 CO",
    "canonical_domain_id": "02",
    "owner_domain": "02 CO + 07 CS Center + 08 Finance (submenu split)",
    "has_submenu": true
  },
  {
    "id": "12",
    "key": "finance",
    "en": "Finance",
    "zh": "财务与结算",
    "canonical": "08 Finance",
    "canonical_domain_id": "08",
    "owner_domain": "08 Finance",
    "has_submenu": false
  },
  {
    "id": "13",
    "key": "risk_control",
    "en": "Risk Control",
    "zh": "风控与审核",
    "canonical": "13 Compliance",
    "canonical_domain_id": "13",
    "owner_domain": "13 Compliance",
    "has_submenu": false
  },
  {
    "id": "14",
    "key": "system_settings",
    "en": "System Settings",
    "zh": "系统设置",
    "canonical": "14 Settings",
    "canonical_domain_id": "14",
    "owner_domain": "14 Settings",
    "has_submenu": false
  }
];

export const PRODUCTS_ORDERS_SUBMENU: OaSubmenuItem[] = [
  {
    "label": "Intake · 宝贝入库",
    "route": "/admin/oa/co/intake",
    "owner": "02 CO"
  },
  {
    "label": "Product Management · 商品管理",
    "route": "/admin/oa/co/products",
    "owner": "02 CO"
  },
  {
    "label": "Asset Management · 素材管理",
    "route": "/admin/oa/co/assets",
    "owner": "02 CO"
  },
  {
    "label": "SKU & Inventory · SKU与库存",
    "route": "/admin/oa/co/sku-inventory",
    "owner": "02 CO / 10 Supply Chain (read)"
  },
  {
    "label": "Order Management · 订单管理",
    "route": "/admin/oa/co/orders",
    "owner": "02 CO"
  },
  {
    "label": "Shipping Settings · 发货配置",
    "route": "/admin/oa/co/shipping",
    "owner": "02 CO / 09 Logistics (config ref)"
  },
  {
    "label": "Returns · 退换货管理",
    "route": "/admin/oa/co/returns",
    "owner": "02 CO"
  }
];

export const CONTENT_ASSETS_SUBMENU: OaSubmenuItem[] = [
  {
    "label": "Site Content · 站点内容",
    "route": "/admin/oa/site/content",
    "owner": "05 Site"
  },
  {
    "label": "Member Content Entry · 会员内容入口",
    "route": "/admin/oa/operations/member-content",
    "owner": "03 Operations / 03D"
  }
];

export const USERS_MEMBERS_SUBMENU: OaSubmenuItem[] = [
  {
    "label": "Member Profiles · 会员档案",
    "route": "/admin/oa/operations/members",
    "owner": "03 Operations"
  },
  {
    "label": "Entitlements Summary · 权益摘要",
    "route": "/admin/oa/operations/entitlements",
    "owner": "03 Operations"
  }
];

export const SEO_GEO_SUBMENU: OaSubmenuItem[] = [
  {
    "label": "Site SEO · 站点 SEO",
    "route": "/admin/oa/site/seo",
    "owner": "05 Site"
  },
  {
    "label": "GEO Config · 区域配置",
    "route": "/admin/oa/geo",
    "owner": "06 GEO"
  }
];

export const LOGISTICS_SUBMENU: OaSubmenuItem[] = [
  {
    "label": "Fulfillment · 履约运输",
    "route": "/admin/oa/logistics/fulfillment",
    "owner": "09 Logistics"
  },
  {
    "label": "Warehouse & Supply · 仓储供应链",
    "route": "/admin/oa/supply",
    "owner": "10 Supply Chain"
  }
];

export const AFTER_SALES_SUBMENU: OaSubmenuItem[] = [
  {
    "label": "Returns Cases · 售后案件",
    "route": "/admin/oa/co/returns",
    "owner": "02 CO"
  },
  {
    "label": "Support Cases · 客服案件",
    "route": "/admin/oa/cs/cases",
    "owner": "07 CS Center"
  },
  {
    "label": "Refund Ledger Jump · 退款账务跳转",
    "route": "/admin/oa/finance/refunds",
    "owner": "08 Finance"
  }
];

export const DATA_SOURCE = 'TEST_ONLY_UI_FIXTURE';
export const NOT_FORMAL_PROVIDER = true;
export const NO_15TH_DOMAIN = true;

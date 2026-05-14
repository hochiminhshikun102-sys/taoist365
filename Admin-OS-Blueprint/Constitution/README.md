# Reverent Inquiry Admin OS Constitution

This directory is the engineering entry point for the Admin OS source of truth.

Authoritative sources, in order:

1. `Reverent Inquiry Admin OS 完整地基最终文档（20260515）.docx`
2. `新模块合集：独立站后台2026051501.docx`
3. `Admin-OS-Blueprint/Reverent_Inquiry_AdminOS_Ultimate/`
4. `Admin-OS-Blueprint/Reverent_Inquiry_Logistics_SupplyChain_Update/`
5. `Admin-OS-Blueprint/Reverent_Inquiry_RiskControl_Update/`
6. `Admin-OS-Blueprint/Reverent_Inquiry_ClientRuntime_Update/`
7. `Admin-OS-Blueprint/Reverent_Inquiry_NewModules_Update/`

Locked rules:

- Reverent Inquiry Admin OS is an AI Native Lifestyle Commerce Operating System.
- It is not a CMS landing page, one-page showcase, Shopify clone, ERP clone, or SaaS dashboard.
- All first-level menus must resolve to independent pages.
- All second-level menus must resolve to independent pages.
- Runtime workspaces must be operational surfaces, not static explanation cards.
- Interactive Runtime Phase is mandatory for all first-level and second-level Runtime modules.
- Every Runtime must move toward click, search, filter, table, actions, forms, upload, queue, status, logs, drawer, and modal.
- PC and mobile must be developed together.
- Mobile admin keeps high-frequency essentials only.
- No module may be merged, omitted, renamed, or invented outside the constitution and Runtime packages.
- Frontstage Runtime is the Browser Air frontstage civilization control layer, not ordinary page management.
- Message & Notification Center, Campaign & Marketing Center, After-Sales Center, Community & Content Moderation, Compliance & Legal Center, and Finance & Settlement Center are locked first-level Runtime modules.
- Member Risk Control exists only in Admin OS. Client Runtime may only expose verification, status, and notifications.
- Media Assets Center remains the Visual Governance Layer.
- Fixed Visual Runtime Mode remains binding for exported visual assets.

Current implementation baseline:

- `/admin` is the Operating Overview page.
- `/admin/[workspaceId]` is the route-based Runtime Workspace page.
- `/account` is the Client Runtime / Human Runtime Layer shell.
- `npm run guardrail:admin-os` protects the constitution paths and route-based workspace rules.

Implementation rule:

When a future request conflicts with this directory, this directory wins unless the user explicitly replaces the constitution with a newer dated source document.

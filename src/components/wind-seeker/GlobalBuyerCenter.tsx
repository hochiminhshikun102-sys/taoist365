"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  afterSalesCases,
  buyerOrders,
  buyerProducts,
  buyerProfile,
  buyerStats,
  depositRecords,
  globalBuyerDepositPolicy,
  mobileTiles,
  notificationSwitches,
  publishSteps,
  riskRows,
  rulesLibrary,
  settlementRows,
  type BuyerProductStatus,
} from "@/config/global-buyer-center";

const A = "/brand/production/homepage/final-air";

type BuyerModule =
  | "overview"
  | "onboarding"
  | "certification"
  | "deposit"
  | "upload"
  | "products"
  | "orders"
  | "shipping"
  | "afterSales"
  | "settlement"
  | "drafts"
  | "risk"
  | "messages"
  | "rules"
  | "account";

type Row = Record<string, string | number>;
type BuyerProduct = (typeof buyerProducts)[number];

const navItems: { id: BuyerModule; label: string; zh: string }[] = [
  { id: "overview", label: "Overview", zh: "首页概览" },
  { id: "onboarding", label: "Onboarding", zh: "入驻进度" },
  { id: "certification", label: "Certification", zh: "认证中心" },
  { id: "deposit", label: "Deposit", zh: "保证金" },
  { id: "upload", label: "Upload Product", zh: "发布商品" },
  { id: "products", label: "Product Library", zh: "产品库" },
  { id: "orders", label: "Orders", zh: "订单管理" },
  { id: "shipping", label: "Shipping", zh: "发货物流" },
  { id: "afterSales", label: "After-Sales", zh: "售后退款" },
  { id: "settlement", label: "Settlement", zh: "收益结算" },
  { id: "drafts", label: "Draft Box", zh: "草稿箱" },
  { id: "risk", label: "Risk Center", zh: "风控中心" },
  { id: "messages", label: "Messages", zh: "消息通知" },
  { id: "rules", label: "Rules", zh: "平台规则" },
  { id: "account", label: "Account", zh: "个人中心" },
];

const statusClasses: Record<BuyerProductStatus, string> = {
  Live: "bg-[#DDE7DD] text-[#3E6446]",
  "In Review": "bg-[#EDE5D8] text-[#7B6048]",
  "Needs Edit": "bg-[#F3ECE2] text-[#7A5A35]",
  Archived: "bg-[#EBEDEF] text-[#6B7280]",
};

function Card({ children, className = "" }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <section className={`rounded-2xl border border-[#D9DCE0] bg-white p-5 shadow-[0_18px_50px_rgba(45,51,58,0.07)] ${className}`}>{children}</section>;
}

function PrimaryButton({ children, onClick, type = "button" }: Readonly<{ children: React.ReactNode; onClick?: () => void; type?: "button" | "submit" }>) {
  return <button type={type} onClick={onClick} className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#A88C75]">{children}</button>;
}

function SecondaryButton({ children, onClick }: Readonly<{ children: React.ReactNode; onClick?: () => void }>) {
  return <button type="button" onClick={onClick} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-sm text-[#2D333A] transition hover:border-[#947A66]">{children}</button>;
}

function ProductThumb({ image, alt }: Readonly<{ image: string; alt: string }>) {
  return <Image src={`${A}/${image}`} alt={alt} width={420} height={300} className="h-full w-full rounded-xl object-cover" />;
}

function SectionTitle({ eyebrow, title, zh, action }: Readonly<{ eyebrow: string; title: string; zh?: string; action?: React.ReactNode }>) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-[#947A66]">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#2D333A]">{title}</h2>
        {zh ? <p className="mt-1 text-sm text-[#6B7280]">{zh}</p> : null}
      </div>
      {action}
    </div>
  );
}

function Bilingual({ en, zh, className = "" }: Readonly<{ en: string; zh: string; className?: string }>) {
  return (
    <span className={className}>
      <span className="block">{en}</span>
      <span className="mt-1 block text-xs font-normal text-[#6B7280]">{zh}</span>
    </span>
  );
}

function MobileBuyerRuntime() {
  const [log, setLog] = useState("Ready / 待操作");
  return (
    <section className="lg:hidden">
      <div className="mx-auto max-w-[28rem] px-4 pb-10 pt-5">
        <MobilePhone id="mobile-home">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold">Hello, {buyerProfile.name}</p>
              <p className="mt-1 inline-flex rounded-full bg-[#EDE5D8] px-3 py-1 text-xs text-[#6B5140]">{buyerProfile.level} / {buyerProfile.levelZh}</p>
            </div>
            <div className="h-16 w-16 overflow-hidden rounded-full"><ProductThumb image="vase-flower.webp" alt="Buyer avatar" /></div>
          </div>
          <div className="mt-5 rounded-2xl bg-[#171716] p-5 text-white">
            <p className="text-xs text-white/66">Today Earnings / 今日收益 (USD)</p>
            <div className="mt-3 flex items-end justify-between"><p className="text-4xl font-semibold">128.60</p><span className="text-[#D8B56D]">+18.6%</span></div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {mobileTiles.map((tile) => {
              const isActive = "active" in tile && tile.active;
              return (
              <a key={tile.label} href={tile.href} className={`relative min-h-28 rounded-2xl border border-[#D9DCE0] p-4 ${isActive ? "bg-[#171716] text-white" : "bg-white text-[#2D333A]"}`}>
                {"badge" in tile && tile.badge ? <span className="absolute right-3 top-3 rounded-full bg-[#D95550] px-2 text-xs text-white">{tile.badge}</span> : null}
                <p className="mt-3 text-base font-semibold">{tile.label}</p>
                <p className={`mt-1 text-xs ${isActive ? "text-white/70" : "text-[#6B7280]"}`}>{tile.labelZh}</p>
                <p className={`mt-2 text-xs ${isActive ? "text-white/66" : "text-[#6B7280]"}`}>{tile.note}</p>
              </a>
              );
            })}
          </div>
          <Card className="mt-5 p-4">
            <div className="flex items-center justify-between">
              <div><p className="font-semibold">Launch checklist</p><p className="mt-1 text-xs text-[#6B7280]">入驻、认证、保证金、审核开通</p></div>
              <SecondaryButton>Continue</SecondaryButton>
            </div>
            <div className="mt-4 h-2 rounded-full bg-[#EBEDEF]"><div className="h-full w-3/4 rounded-full bg-[#C49A52]" /></div>
          </Card>
          <MobileBottom />
        </MobilePhone>

        <MobilePhone id="mobile-capture" title="Capture Product" zh="拍商品" right="Drafts">
          <StepDots active={0} />
          <div className="mt-5 overflow-hidden rounded-2xl bg-[#171716] p-3">
            <div className="relative h-[28rem] overflow-hidden rounded-xl">
              <ProductThumb image="vase-flower.webp" alt="Capture product" />
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 border border-white/18">{Array.from({ length: 9 }).map((_, index) => <span key={index} className="border border-white/12" />)}</div>
              <div className="absolute bottom-5 left-0 right-0 flex items-center justify-around text-white">
                <button className="rounded-full bg-white/14 px-5 py-4">Album</button>
                <button className="h-20 w-20 rounded-full border-4 border-white bg-white/20" aria-label="take photo" />
                <button className="rounded-full bg-white/14 px-5 py-4">Video</button>
              </div>
            </div>
          </div>
        </MobilePhone>

        <MobilePhone title="AI Recognition Result" zh="AI识别结果" right="Retry">
          <StepDots active={1} />
          <div className="mt-5 flex gap-4">
            <div className="h-24 w-24 overflow-hidden rounded-xl"><ProductThumb image="vase-flower.webp" alt="AI result" /></div>
            <div><span className="rounded-full bg-[#DDE7DD] px-3 py-1 text-xs text-[#3E6446]">Recognized / 已识别</span><p className="mt-3 text-sm">Confidence 92%</p></div>
          </div>
          {[
            ["Title", "Vintage handmade ceramic vase / 复古手工陶瓷花瓶", "Copy"],
            ["Description", "Warm glazed handmade vase, suitable for dried flowers and slow living interiors. / 适合干花和家居陈列", "Copy"],
            ["Category", "Home Decor > Vase / 家居装饰 > 花瓶", "Edit"],
            ["Suggested Price", "$48.00", "Edit"],
            ["Keywords", "ceramic vase, handmade, wabi sabi, home decor", "Copy"],
          ].map(([label, value, action]) => (
            <div key={label} className="mt-5 border-b border-[#D9DCE0] pb-4">
              <div className="flex justify-between gap-4"><p className="text-sm font-semibold">{label}</p><button className="text-sm text-[#947A66]">{action}</button></div>
              <p className="mt-2 text-sm leading-6 text-[#4B5563]">{value}</p>
            </div>
          ))}
        </MobilePhone>

        <MobilePhone title="Complete Listing Info" zh="补充信息">
          <StepDots active={2} />
          <ListingForm compact />
        </MobilePhone>

        <MobilePhone title="Submit for Review" zh="提交审核">
          <StepDots active={3} />
          <Card className="p-4">
            <p className="font-semibold">Product Preview / 商品预览</p>
            <div className="mt-4 flex gap-3">
              <div className="h-24 w-24 overflow-hidden rounded-xl"><ProductThumb image="vase-flower.webp" alt="Product preview" /></div>
              <div><p className="font-semibold">Vintage Handmade Ceramic Vase</p><p className="mt-2 text-sm">$48.00</p><p className="text-xs text-[#6B7280]">Japan / Kyoto</p></div>
            </div>
          </Card>
          <Card className="mt-4 p-4">
            <p className="font-semibold">Review checklist / 审核清单</p>
            {["Clear product images", "Complete information", "Correct category", "Reasonable price", "No restricted items"].map((item) => <div key={item} className="mt-3 flex items-center justify-between text-sm"><span>{item}</span><span className="text-[#947A66]">OK</span></div>)}
          </Card>
          <label className="mt-5 flex items-center gap-3 text-sm"><input type="checkbox" defaultChecked /> I agree to the Platform Service Agreement / 同意平台服务协议</label>
          <PrimaryButton onClick={() => setLog("Submitted to QS Admin OS review queue / 已提交审核队列")}>Submit Review</PrimaryButton>
          <p className="mt-3 rounded-xl bg-[#EBEDEF] p-3 text-xs text-[#6B7280]">Log: {log}</p>
        </MobilePhone>

        <MobileProductList />
        <MobileBusinessList id="mobile-shipping" title="Shipping" zh="发货物流" rows={buyerOrders.map((item) => [`${item.id} · ${item.product}`, `${item.state} · ${item.deadline}`, item.tracking || "Tracking pending"])} actions={["Add Tracking", "Choose Carrier", "View Route"]} />
        <MobileBusinessList id="mobile-after-sales" title="After-Sales" zh="售后退款" rows={afterSalesCases.map((item) => [`${item.id} · ${item.type}`, `${item.product} · ${item.amount}`, `${item.status} · ${item.reason}`])} actions={["Approve", "Reject", "Upload Evidence"]} />
        <MobileBusinessList id="mobile-deposit" title="Deposit" zh="保证金" rows={depositRecords.map((item) => [`${item.id} · ${item.type}`, `${item.amount} · ${item.state}`, item.note])} actions={["Pay Deposit", "Request Return", "View Rules"]} />
        <MobileBusinessList id="mobile-settlement" title="Settlement" zh="收益结算" rows={settlementRows.map((item) => [`${item.id} · ${item.order}`, `Commission ${item.commission}`, `${item.state} · Fee ${item.fee}`])} actions={["Request Payout", "View Bill", "Export"]} />
        <MobileBusinessList id="mobile-messages" title="Messages" zh="消息通知" rows={notificationSwitches.map((item, index) => [`NT-${index + 1}`, `${item} enabled`, "Configurable / 可配置"])} actions={["Mark Read", "Settings", "Quiet Hours"]} />
        <MobileBusinessList id="mobile-help" title="Help & Rules" zh="帮助规则" rows={rulesLibrary.map((rule) => [rule.group, `${rule.title} / ${rule.groupZh}`, `${rule.version} · ${rule.updated}`])} actions={["Open Guide", "Search", "Support"]} />
      </div>
    </section>
  );
}

function MobilePhone({ children, title, zh, right, id }: Readonly<{ children: React.ReactNode; title?: string; zh?: string; right?: string; id?: string }>) {
  return (
    <article id={id} className="mb-8 rounded-[2rem] border border-white bg-white p-5 shadow-[0_24px_80px_rgba(45,51,58,0.12)]">
      <div className="mb-5 flex items-center justify-between text-sm font-semibold">
        <span>9:41</span>
        <span className="text-center">{title ? <><span>{title}</span>{zh ? <span className="block text-xs font-normal text-[#6B7280]">{zh}</span> : null}</> : null}</span>
        <button className="text-[#947A66]">{right ?? "Menu"}</button>
      </div>
      {children}
    </article>
  );
}

function MobileBottom() {
  return <div className="mt-6 grid grid-cols-5 border-t border-[#D9DCE0] pt-4 text-center text-xs text-[#6B7280]">{["Home", "Products", "+", "Orders", "Me"].map((item) => <span key={item} className={item === "Home" || item === "+" ? "font-semibold text-[#947A66]" : ""}>{item}</span>)}</div>;
}

function StepDots({ active }: Readonly<{ active: number }>) {
  return <div className="grid grid-cols-4 gap-2 text-center text-xs text-[#6B7280]">{publishSteps.slice(0, 4).map((step, index) => <div key={step.label}><span className={`mx-auto grid h-7 w-7 place-items-center rounded-full ${index <= active ? "bg-[#C49A52] text-white" : "bg-[#EBEDEF]"}`}>{index + 1}</span><p className="mt-1">{step.label}</p><p>{step.labelZh}</p></div>)}</div>;
}

function ListingForm({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <form className={`grid gap-4 ${compact ? "mt-5" : "mt-6 md:grid-cols-2"}`}>
      {[["Price (USD)", "$48.00"], ["Location", "Japan / Kyoto"], ["Stock", "1"]].map(([label, value]) => <label key={label} className="grid gap-2 text-sm"><span>{label}</span><input defaultValue={value} className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 outline-none focus:border-[#947A66]" /></label>)}
      <label className={`grid gap-2 text-sm ${compact ? "" : "md:col-span-2"}`}><span>Object story / 物品故事</span><textarea defaultValue="Found in a Kyoto vintage shop. The object is intact and suitable for a quiet home setting." className="min-h-28 rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 outline-none focus:border-[#947A66]" /></label>
      <div className={`grid grid-cols-2 gap-3 ${compact ? "" : "md:col-span-2"}`}><SecondaryButton>Previous</SecondaryButton><PrimaryButton>Next</PrimaryButton></div>
    </form>
  );
}

function MobileProductList() {
  return (
    <MobilePhone id="mobile-products" title="My Products" zh="我的商品">
      <div className="mb-4 flex gap-4 text-sm">{["All 24", "Live 18", "Review 3", "Archived 3"].map((tab, index) => <button key={tab} className={index === 1 ? "border-b border-[#2D333A] pb-2" : "pb-2 text-[#6B7280]"}>{tab}</button>)}</div>
      <div className="grid gap-4">{buyerProducts.slice(0, 4).map((product) => <div key={product.id} className="flex gap-3 border-b border-[#D9DCE0] pb-4"><div className="h-24 w-24 overflow-hidden rounded-xl"><ProductThumb image={product.image} alt={product.title} /></div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><p className="font-semibold leading-6">{product.title}<span className="block text-xs font-normal text-[#6B7280]">{product.titleZh}</span></p><span className={`h-fit rounded-full px-2 py-1 text-xs ${statusClasses[product.status]}`}>{product.status}</span></div><p className="mt-2 font-semibold">{product.price}</p><p className="mt-1 text-xs text-[#6B7280]">Stock {product.stock} · Views {product.views} · Orders {product.orders}</p></div></div>)}</div>
      <MobileBottom />
    </MobilePhone>
  );
}

function MobileBusinessList({ id, title, zh, rows, actions }: Readonly<{ id: string; title: string; zh: string; rows: readonly (readonly string[])[]; actions: readonly string[] }>) {
  const [log, setLog] = useState("Ready");
  return (
    <MobilePhone id={id} title={title} zh={zh}>
      <div className="grid gap-3">{rows.map((row) => <div key={row.join("-")} className="rounded-2xl border border-[#D9DCE0] bg-[#F5F6F8] p-4"><p className="font-semibold">{row[0]}</p><p className="mt-2 text-sm text-[#4B5563]">{row[1]}</p><p className="mt-1 text-xs text-[#6B7280]">{row[2]}</p></div>)}</div>
      <div className="mt-5 grid grid-cols-3 gap-2">{actions.map((action) => <button key={action} type="button" onClick={() => setLog(`${action} logged`)} className="rounded-xl border border-[#D9DCE0] bg-white px-3 py-3 text-xs">{action}</button>)}</div>
      <p className="mt-4 rounded-xl bg-[#EBEDEF] p-3 text-xs text-[#6B7280]">Log: {log}</p>
    </MobilePhone>
  );
}

function DesktopBuyerRuntime() {
  const [active, setActive] = useState<BuyerModule>("overview");
  const [query, setQuery] = useState("");
  const filteredProducts = useMemo(() => buyerProducts.filter((product) => `${product.title} ${product.titleZh}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <section className="hidden lg:block">
      <div className="mx-auto grid min-h-screen max-w-[96rem] grid-cols-[18rem_1fr] gap-6 px-8 py-8">
        <aside className="sticky top-8 h-[calc(100vh-4rem)] rounded-2xl border border-[#D9DCE0] bg-white p-4 shadow-[0_24px_80px_rgba(45,51,58,0.08)]">
          <div className="border-b border-[#D9DCE0] pb-5"><p className="text-2xl font-semibold">Dohara</p><p className="mt-1 text-sm text-[#6B7280]">Global Buyer Center / 全球买手中心</p></div>
          <nav className="mt-5 grid gap-2">{navItems.map((item) => <button key={item.id} type="button" onClick={() => setActive(item.id)} className={`rounded-xl border px-4 py-3 text-left transition ${active === item.id ? "border-[#947A66] bg-[#947A66] text-white" : "border-transparent text-[#4B5563] hover:border-[#D9DCE0] hover:bg-[#F5F6F8]"}`}><span className="block font-semibold">{item.label}</span><span className={`mt-1 block text-xs ${active === item.id ? "text-white/75" : "text-[#6B7280]"}`}>{item.zh}</span></button>)}</nav>
          <div className="mt-4 grid gap-2 border-t border-[#D9DCE0] pt-4">
            <Link href="/wind-seeker/upload" className="rounded-xl border border-[#947A66] bg-[#947A66] px-4 py-3 text-sm font-semibold text-white">Upload to Object Pipeline</Link>
            <Link href="/wind-seeker/products" className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3 text-sm">My Pipeline Objects</Link>
          </div>
        </aside>

        <main>
          <header className="flex items-center justify-between">
            <div><h1 className="text-5xl font-semibold text-[#2D333A]">Global Buyer Dashboard</h1><p className="mt-2 text-[#6B7280]">全球买手后台 · Default English with Chinese support</p></div>
            <div className="flex items-center gap-4 rounded-2xl border border-[#D9DCE0] bg-white px-4 py-3"><span className="rounded-full bg-[#D95550] px-2 text-xs text-white">3</span><div className="h-12 w-12 overflow-hidden rounded-full"><ProductThumb image="vase-flower.webp" alt="avatar" /></div><div><p className="font-semibold">{buyerProfile.name}</p><p className="text-sm text-[#6B7280]">ID: {buyerProfile.id}</p></div></div>
          </header>

          {active === "overview" ? <OverviewPanel setActive={setActive} /> : null}
          {active === "onboarding" ? <OnboardingPanel /> : null}
          {active === "upload" ? <UploadPanel /> : null}
          {active === "products" ? <ProductsPanel query={query} setQuery={setQuery} products={filteredProducts} /> : null}
          {active === "orders" ? <DataTable title="Orders" zh="订单管理" eyebrow="Order Runtime" rows={buyerOrders} columns={["id", "product", "buyer", "amount", "state", "deadline", "tracking"]} actions={["View", "Ship", "After-Sales"]} /> : null}
          {active === "shipping" ? <ShippingPanel /> : null}
          {active === "deposit" ? <DepositPanel /> : null}
          {active === "afterSales" ? <DataTable title="After-Sales & Refunds" zh="售后与退款" eyebrow="After-Sales Runtime" rows={afterSalesCases} columns={["id", "type", "product", "amount", "status", "reason", "evidence"]} actions={["Approve", "Reject", "Negotiate", "Upload Evidence"]} /> : null}
          {active === "settlement" ? <DataTable title="Earnings & Settlement" zh="收益与结算" eyebrow="Settlement Runtime" rows={settlementRows} columns={["id", "order", "gross", "fee", "tax", "commission", "state"]} actions={["Request Payout", "Freeze", "Export"]} /> : null}
          {active === "drafts" ? <DraftsPanel /> : null}
          {active === "risk" ? <DataTable title="Risk Center" zh="风控中心" eyebrow="Risk Runtime" rows={riskRows} columns={["id", "buyer", "signal", "score", "state", "note"]} actions={["Detail", "Appeal", "Pay Deposit", "Contact Platform"]} /> : null}
          {active === "certification" || active === "account" ? <AccountPanel /> : null}
          {active === "messages" ? <MessagesPanel /> : null}
          {active === "rules" ? <RulesPanel /> : null}
        </main>
      </div>
    </section>
  );
}

function OverviewPanel({ setActive }: Readonly<{ setActive: (module: BuyerModule) => void }>) {
  return (
    <div className="mt-8 grid gap-5">
      <div className="grid grid-cols-5 gap-4">{buyerStats.map((stat) => <Card key={stat.label}><p className="text-sm text-[#6B7280]">{stat.label}<span className="block text-xs">{stat.labelZh}</span></p><p className="mt-3 text-3xl font-semibold">{stat.value}</p><p className="mt-2 text-sm text-[#947A66]">{stat.note}</p></Card>)}</div>
      <Card className="flex items-center justify-between bg-[#F3ECE2]"><p>System notice: buyer onboarding, certification, {globalBuyerDepositPolicy.onboardingDepositLabel} deposit, QS review, and product-library entry are open.</p><SecondaryButton>View Details</SecondaryButton></Card>
      <div className="grid grid-cols-[1fr_20rem] gap-5"><UploadPanel compact /><Card><SectionTitle eyebrow="Queue" title="Action Queue" zh="待办事项" />{[["Products in review", "products"], ["Orders to ship", "shipping"], ["After-sales cases", "afterSales"], ["Deposit status", "deposit"]].map(([label, id]) => <button key={label} type="button" onClick={() => setActive(id as BuyerModule)} className="mt-4 flex w-full justify-between rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 text-left"><span>{label}</span><span className="text-[#947A66]">Open</span></button>)}</Card></div>
      <ProductsPanel compact products={buyerProducts} query="" setQuery={() => {}} />
    </div>
  );
}

function OnboardingPanel() {
  const steps = [
    ["Application", "入驻申请", "Submitted"],
    ["Certification", "实名认证", "Verified"],
    ["Deposit", "保证金", globalBuyerDepositPolicy.onboardingDepositLabel],
    ["QS Review", "审核开通", "Pending final review"],
    ["Product Library", "进入平台产品库", "Ready after approval"],
  ];
  return <Card className="mt-8"><SectionTitle eyebrow="Buyer Launch" title="Onboarding & Activation" zh="入驻、认证、保证金、审核开通、进入产品库" /><div className="mt-6 grid grid-cols-5 gap-4">{steps.map(([en, zh, state], index) => <div key={en} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-4"><p className="text-[#947A66]">0{index + 1}</p><h3 className="mt-3 font-semibold">{en}</h3><p className="text-xs text-[#6B7280]">{zh}</p><p className="mt-4 rounded-full bg-white px-3 py-2 text-xs">{state}</p></div>)}</div></Card>;
}

function UploadPanel({ compact = false }: Readonly<{ compact?: boolean }>) {
  return <Card><SectionTitle eyebrow="AI Listing" title="Publish Product" zh="发布商品" action={!compact ? <PrimaryButton>New Product</PrimaryButton> : <SecondaryButton>Tutorial</SecondaryButton>} /><div className="mt-8 grid grid-cols-5 gap-4">{publishSteps.map((step, index) => <div key={step.label} className="text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#947A66] bg-[#F3ECE2] text-[#947A66]">{index === 1 ? "AI" : index + 1}</span><p className="mt-3 font-semibold">{step.label}</p><p className="text-xs text-[#6B7280]">{step.labelZh}</p><p className="mt-1 text-xs text-[#6B7280]">{step.note}</p></div>)}</div>{!compact ? <ListingForm /> : null}</Card>;
}

function ProductsPanel({ products, query, setQuery, compact = false }: Readonly<{ products: readonly BuyerProduct[]; query: string; setQuery: (value: string) => void; compact?: boolean }>) {
  return (
    <Card>
      <SectionTitle eyebrow="Products" title={compact ? "Recent Product Library Entries" : "Product Library"} zh={compact ? "最近进入产品库" : "平台产品库"} action={!compact ? <PrimaryButton>New Product</PrimaryButton> : null} />
      {!compact ? <div className="mt-5 grid grid-cols-[1fr_auto_auto] gap-3"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products / 搜索商品" className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 outline-none" /><select className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3"><option>All Status</option><option>Live</option><option>In Review</option></select><SecondaryButton>Bulk Archive</SecondaryButton></div> : null}
      <div className="mt-5 grid grid-cols-5 gap-4">{products.map((product) => <article key={product.id} className="rounded-xl border border-[#D9DCE0] bg-[#F5F6F8] p-3"><div className="h-36 overflow-hidden rounded-xl"><ProductThumb image={product.image} alt={product.title} /></div><span className={`mt-3 inline-flex rounded-full px-2 py-1 text-xs ${statusClasses[product.status]}`}>{product.status}</span><h3 className="mt-3 min-h-12 font-semibold leading-6">{product.title}<span className="block text-xs font-normal text-[#6B7280]">{product.titleZh}</span></h3><p className="mt-2 text-[#947A66]">{product.price}</p><p className="mt-2 text-xs text-[#6B7280]">Views {product.views} · Orders {product.orders}</p>{!compact ? <div className="mt-3 flex gap-2"><SecondaryButton>Edit</SecondaryButton><SecondaryButton>Log</SecondaryButton></div> : null}</article>)}</div>
    </Card>
  );
}

function ShippingPanel() {
  return <div className="mt-8 grid gap-5"><DataTable title="Shipping & Logistics" zh="发货与物流" eyebrow="Shipping Runtime" rows={buyerOrders} columns={["id", "product", "buyer", "amount", "state", "deadline", "tracking"]} actions={["Choose Carrier", "Add Tracking", "Upload Proof"]} /><Card><SectionTitle eyebrow="Templates" title="Shipping Templates" zh="发货模板 / 退货地址" /><form className="mt-5 grid grid-cols-3 gap-3"><input defaultValue="DHL / UPS / SF Express" className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3" /><input defaultValue="Kyoto return address / 京都退货地址" className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3" /><PrimaryButton type="submit">Save Template</PrimaryButton></form></Card></div>;
}

function DepositPanel() {
  return <div className="mt-8 grid gap-5"><div className="grid grid-cols-4 gap-4">{[`Onboarding Deposit ${globalBuyerDepositPolicy.onboardingDepositLabel}`, "Status Paid", "Frozen $80.00", "Deducted $12.00"].map((item) => <Card key={item}><p className="text-xl font-semibold">{item}</p></Card>)}</div><DataTable title="Deposit Records" zh="保证金明细" eyebrow="Deposit Runtime" rows={depositRecords} columns={["id", "type", "amount", "state", "time", "note"]} actions={["Pay", "Request Return", "View Deduction"]} /><RulesPanel compact /></div>;
}

function DraftsPanel() {
  const rows = [
    { id: "DR-01", product: "Vintage Ceramic Vase", step: "Complete Info", state: "Draft", updated: "2026-05-18", owner: "Wind Seeker" },
    { id: "DR-02", product: "Handwoven Wrap", step: "Revise", state: "Returned", updated: "2026-05-17", owner: "Wind Seeker" },
    { id: "DR-03", product: "Candle Set", step: "Submit Review", state: "Submitted", updated: "2026-05-16", owner: "Wind Seeker" },
  ];
  return <DataTable title="Draft Box" zh="草稿箱" eyebrow="Draft Runtime" rows={rows} columns={["id", "product", "step", "state", "updated", "owner"]} actions={["Continue", "Delete", "Resubmit"]} />;
}

function AccountPanel() {
  return <div className="mt-8 grid gap-5"><Card><SectionTitle eyebrow="Account" title="Certification & Account Security" zh="认证中心 / 账号安全" /><form className="mt-5 grid grid-cols-3 gap-4">{["Identity: Verified / 实名已通过", "Email: wind@example.com", "Phone: +81 090 **** 1258", "Payout: PayPal linked", "Address: Review pending", "Devices: 2 active"].map((value) => <input key={value} defaultValue={value} className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3" />)}<PrimaryButton>Save Settings</PrimaryButton><SecondaryButton>Change Password</SecondaryButton><SecondaryButton>Sign Out</SecondaryButton></form></Card><NotificationSettings /></div>;
}

function MessagesPanel() {
  return <Card className="mt-8"><SectionTitle eyebrow="Messages" title="Platform Notices" zh="平台通知" action={<SecondaryButton>Mark All Read</SecondaryButton>} />{["Product approved: Handmade Ceramic Cup", "Order paid: #12568", "Campaign reward issued: $200"].map((message) => <div key={message} className="mt-4 rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-4"><p>{message}</p><p className="mt-1 text-xs text-[#6B7280]">1 hour ago · View details</p></div>)}</Card>;
}

function RulesPanel({ compact = false }: Readonly<{ compact?: boolean }>) {
  return <Card className={compact ? "" : "mt-8"}><SectionTitle eyebrow="Rules & Help" title={compact ? "Deposit Rules" : "Platform Rules & Help"} zh={compact ? "保证金规则" : "平台规则 / 帮助中心"} /><div className="mt-5 grid gap-3">{(compact ? rulesLibrary.slice(0, 3) : rulesLibrary).map((rule) => <div key={rule.title} className="grid grid-cols-[10rem_1fr_auto] gap-3 rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-4"><span>{rule.group}<span className="block text-xs text-[#6B7280]">{rule.groupZh}</span></span><strong>{rule.title}</strong><span className="text-[#6B7280]">{rule.version} · {rule.updated}</span></div>)}</div></Card>;
}

function NotificationSettings() {
  return <Card><SectionTitle eyebrow="Notification" title="Notification Settings" zh="消息通知设置" /><div className="mt-5 grid grid-cols-5 gap-3">{notificationSwitches.map((item) => <label key={item} className="flex items-center justify-between rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-4"><span>{item}</span><input type="checkbox" defaultChecked /></label>)}</div><label className="mt-4 grid max-w-md gap-2 text-sm"><span>Quiet hours / 免打扰时段</span><input defaultValue="22:00 - 08:00" className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3" /></label></Card>;
}

function DataTable({ title, zh, eyebrow, rows, columns, actions }: Readonly<{ title: string; zh: string; eyebrow: string; rows: readonly Row[]; columns: string[]; actions: string[] }>) {
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState<Row | null>(null);
  const [logs, setLogs] = useState(["Module loaded / 模块已加载"]);
  const filtered = rows.filter((row) => Object.values(row).join(" ").toLowerCase().includes(query.toLowerCase()));
  function writeLog(action: string, row: Row) {
    setDrawer(row);
    setLogs((current) => [`${new Date().toLocaleString()} · ${action}: ${String(row.id)}`, ...current].slice(0, 6));
  }
  return (
    <Card className="mt-8">
      <SectionTitle eyebrow={eyebrow} title={title} zh={zh} action={<PrimaryButton>New Record</PrimaryButton>} />
      <div className="mt-5 grid grid-cols-[1fr_auto_auto] gap-3"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records / 搜索记录" className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] px-4 py-3 outline-none" /><select className="rounded-xl border border-[#D9DCE0] bg-white px-4 py-3"><option>All Status</option><option>Pending</option><option>Completed</option></select><SecondaryButton>Export</SecondaryButton></div>
      <div className="mt-5 overflow-auto rounded-xl border border-[#D9DCE0]"><table className="w-full min-w-[70rem] border-collapse text-sm"><thead className="bg-[#EBEDEF] text-left text-[#6B7280]"><tr>{columns.map((column) => <th key={column} className="whitespace-nowrap border-b border-[#D9DCE0] px-3 py-3">{column}</th>)}<th className="whitespace-nowrap border-b border-[#D9DCE0] px-3 py-3">Actions</th></tr></thead><tbody>{filtered.map((row) => <tr key={String(row.id)}>{columns.map((column) => <td key={column} className="whitespace-nowrap border-b border-[#D9DCE0] px-3 py-3">{String(row[column] ?? "")}</td>)}<td className="border-b border-[#D9DCE0] px-3 py-3"><div className="flex min-w-max gap-2">{actions.map((action) => <SecondaryButton key={action} onClick={() => writeLog(action, row)}>{action}</SecondaryButton>)}</div></td></tr>)}</tbody></table></div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_20rem]">{drawer ? <div className="rounded-xl border border-[#947A66] bg-[#F3ECE2] p-5"><div className="flex justify-between"><h3 className="text-2xl font-semibold">Record Drawer / 记录抽屉</h3><button onClick={() => setDrawer(null)}>Close</button></div><pre className="mt-4 whitespace-pre-wrap text-sm">{JSON.stringify(drawer, null, 2)}</pre><textarea className="mt-4 min-h-24 w-full rounded-xl border border-[#D9DCE0] bg-white p-3" placeholder="Processing note / 处理备注" /><div className="mt-3 flex gap-2"><PrimaryButton>Confirm</PrimaryButton><SecondaryButton>Write Log</SecondaryButton></div></div> : <div className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-5 text-sm text-[#6B7280]">Select a row action to open the drawer. / 点击操作打开抽屉</div>}<div className="rounded-xl border border-[#D9DCE0] bg-[#EBEDEF] p-4"><p className="font-semibold">Logs / 日志</p>{logs.map((log) => <p key={log} className="mt-3 rounded-lg bg-white p-3 text-xs">{log}</p>)}</div></div>
    </Card>
  );
}

export function GlobalBuyerCenter() {
  return (
    <main className="min-h-dvh bg-[#F5F6F8] text-[#2D333A]">
      <MobileBuyerRuntime />
      <DesktopBuyerRuntime />
    </main>
  );
}

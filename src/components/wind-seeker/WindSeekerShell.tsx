import Image from "next/image";
import Link from "next/link";

export const windSeekerLogo = "/brand/production/wind-seeker-logo.png";
export const windSeekerIcon = "/brand/production/wind-seeker-icon.png";

const navItems = [
  { label: "Dashboard", href: "/wind-seeker", key: "dashboard" },
  { label: "Upload", href: "/wind-seeker/upload?step=capture", key: "upload" },
  { label: "My Products", href: "/wind-seeker/products", key: "products" },
  { label: "Earnings", href: "/wind-seeker", key: "earnings", disabled: true },
  { label: "Rewards", href: "/wind-seeker", key: "rewards", disabled: true },
  { label: "Messages", href: "/wind-seeker", key: "messages", disabled: true },
  { label: "Help", href: "/wind-seeker", key: "help", disabled: true },
] as const;

const bottomItems = [
  { label: "Home", href: "/wind-seeker", key: "dashboard" },
  { label: "Upload", href: "/wind-seeker/upload?step=capture", key: "upload" },
  { label: "+", href: "/wind-seeker/upload?step=capture", key: "plus" },
  { label: "Products", href: "/wind-seeker/products", key: "products" },
  { label: "Me", href: "/wind-seeker", key: "me" },
] as const;

export function WindSeekerHeader({ active = "dashboard" }: Readonly<{ active?: string }>) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#D9E2EC] bg-white/96 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <Link href="/wind-seeker" className="relative h-10 w-48 shrink-0" aria-label="Wind Seeker dashboard">
            <Image src={windSeekerLogo} alt="Wind Seeker" fill priority className="object-contain object-left" sizes="192px" />
          </Link>
          <nav className="hidden items-center gap-10 text-sm font-semibold text-[#223247] lg:flex">
            {["Home", "About", "Collection", "Wellness", "Journal", "Contact"].map((item) => (
              <Link key={item} href={item === "Home" ? "/" : "/objects"} className="transition hover:text-[#123A68]">
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/wind-seeker/products" className="hidden rounded-full border border-[#D9E2EC] px-4 py-2 text-sm text-[#5E738A] sm:inline-flex">
              My products
            </Link>
            <Link href="/wind-seeker/upload?step=capture" className="rounded-full bg-[#123A68] px-4 py-2 text-sm font-semibold text-white">
              Upload
            </Link>
          </div>
        </div>
      </header>
      <nav className="sticky top-[72px] z-30 hidden h-14 border-b border-[#D9E2EC] bg-white/95 lg:block">
        <div className="mx-auto flex h-full max-w-[1440px] items-center px-10">
          {navItems.map((item) => {
            const disabled = "disabled" in item && item.disabled;
            return (
            <Link
              key={item.key}
              href={item.href}
              aria-disabled={disabled || undefined}
              className={`relative mr-12 flex h-full items-center text-sm ${
                active === item.key ? "font-semibold text-[#123A68]" : disabled ? "text-[#9AA8B6]" : "text-[#5E738A]"
              }`}
            >
              {item.label}
              {active === item.key ? <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#C9A45C]" /> : null}
            </Link>
          );
          })}
        </div>
      </nav>
    </>
  );
}

export function WindSeekerFrame({
  active,
  children,
  intro = false,
}: Readonly<{ active?: string; children: React.ReactNode; intro?: boolean }>) {
  return (
    <main className="min-h-dvh bg-[#F3F7FB] pb-24 text-[#223247] lg:pb-0">
      <WindSeekerHeader active={active} />
      <div className={intro ? "" : "mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10"}>{children}</div>
      {!intro ? <WindSeekerMobileBottom active={active} /> : null}
    </main>
  );
}

export function WindSeekerMobileBottom({ active = "dashboard" }: Readonly<{ active?: string }>) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D9E2EC] bg-white/96 px-4 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-16px_40px_rgba(18,58,104,0.08)] lg:hidden">
      <div className="mx-auto grid max-w-[390px] grid-cols-5 items-center gap-1 text-center text-[11px] text-[#5E738A]">
        {bottomItems.map((item) => {
          const isActive = active === item.key || (item.key === "plus" && active === "upload");
          return (
            <Link key={item.key} href={item.href} className="grid min-h-14 place-items-center">
              <span
                className={
                  item.key === "plus"
                    ? "grid h-11 w-11 place-items-center rounded-full bg-[#123A68] text-xl font-semibold text-white"
                    : isActive
                      ? "font-semibold text-[#123A68]"
                      : ""
                }
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function WindSeekerCard({ children, className = "" }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <section className={`rounded-[18px] border border-[#D9E2EC] bg-white shadow-[0_18px_48px_rgba(18,58,104,0.07)] ${className}`}>{children}</section>;
}

export function WindSeekerStepNav({ activeStep }: Readonly<{ activeStep: "capture" | "ai-draft" | "details" | "submit" }>) {
  const steps = [
    { key: "capture", label: "Capture" },
    { key: "ai-draft", label: "AI Draft" },
    { key: "details", label: "Details" },
    { key: "submit", label: "Submit" },
  ] as const;
  const activeIndex = steps.findIndex((step) => step.key === activeStep);
  return (
    <div className="grid grid-cols-4 gap-2">
      {steps.map((step, index) => (
        <div key={step.key} className="text-center text-xs text-[#5E738A]">
          <span className={`mx-auto grid h-8 w-8 place-items-center rounded-full ${index <= activeIndex ? "bg-[#C9A45C] text-white" : "bg-[#EAF3FE] text-[#5E738A]"}`}>
            {index + 1}
          </span>
          <span className="mt-2 block font-medium">{step.label}</span>
        </div>
      ))}
    </div>
  );
}

export function WindSeekerStatusPill({ status }: Readonly<{ status?: string | null }>) {
  const value = status || "draft";
  const tone = value === "published" || value === "approved" ? "bg-[#E1F0E9] text-[#2E8B68]" : value.includes("reject") || value.includes("required") ? "bg-[#F8E8E4] text-[#B84537]" : "bg-[#F6EFD8] text-[#A86F14]";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
}

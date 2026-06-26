import Link from "next/link";

const commerceOpsLinks = [
  { href: "/admin/product-intake", label: "宝贝入库", note: "上传建档" },
  { href: "/admin/product-media", label: "商品素材", note: "图片视频" },
  { href: "/admin/publish-review", label: "发布审核", note: "审核上架" },
  { href: "/admin/objects", label: "已发布商品", note: "商品系统" },
  { href: "/admin/orders", label: "订单系统", note: "订单售后" },
] as const;

export function AdminCommerceOpsNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex w-[min(calc(100%-2rem),58rem)] -translate-x-1/2 gap-2 rounded-2xl border border-[#D9DCE0] bg-white/92 p-2 text-[#2D333A] shadow-[0_18px_60px_rgba(45,51,58,0.16)] backdrop-blur" aria-label="商品与订单快捷入口">
      {commerceOpsLinks.map((item) => (
        <Link key={item.href} href={item.href} className="min-w-0 flex-1 rounded-xl border border-transparent px-3 py-2 text-center transition hover:border-[#947A66] hover:bg-[#F3ECE2]">
          <span className="block truncate text-sm font-semibold">{item.label}</span>
          <span className="mt-0.5 block truncate text-[0.7rem] text-[#6B7280]">{item.note}</span>
        </Link>
      ))}
    </nav>
  );
}

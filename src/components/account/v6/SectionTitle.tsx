/**
 * SectionTitle · V6 C1-A
 * 区块标题（衬线24/32 + 右侧View All链接 + Chevron）
 * Chevron由组件内SVG统一绘制（SOP 7.3），禁逐页自画。
 */
export interface SectionTitleProps {
  title: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  /** 标题层级（默认h2） */
  as?: "h2" | "h3";
}

/** DH Chevron：组件统一SVG实现（stroke=currentColor） */
export function DhChevron() {
  return (
    <svg className="dh-chevron" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M7 4.5 L11.5 9 L7 13.5" />
    </svg>
  );
}

export function SectionTitle({
  title,
  viewAllLabel = "View All",
  viewAllHref,
  as: Tag = "h2",
}: SectionTitleProps) {
  return (
    <div className="dhv6-st dh-scope" data-dh-component="SectionTitle">
      <Tag className="dhv6-st__title">{title}</Tag>
      {viewAllHref ? (
        <a className="dhv6-st__viewall dh-focusable" href={viewAllHref}>
          {viewAllLabel}
          <DhChevron />
        </a>
      ) : null}
    </div>
  );
}

/**
 * CompactPageTitle · V6 C1-A
 * 紧凑型内页标题（32/40，Mobile 26/34）
 * 与AccountGlobalHeader（导航层）和AccountHero（场景层）职责互斥：
 * 无场景图的内页用本组件，禁止用Hero字阶。
 */
export interface CompactPageTitleProps {
  title: string;
  subtitle?: string;
  /** 标题层级（默认h1；嵌套在Hero页内的次级区域用h2） */
  as?: "h1" | "h2";
}

export function CompactPageTitle({
  title,
  subtitle,
  as: Tag = "h1",
}: CompactPageTitleProps) {
  return (
    <div className="dhv6-cpt dh-scope" data-dh-component="CompactPageTitle">
      <Tag className="dhv6-cpt__title">{title}</Tag>
      {subtitle ? <p className="dhv6-cpt__subtitle">{subtitle}</p> : null}
    </div>
  );
}

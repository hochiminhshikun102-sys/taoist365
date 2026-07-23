/**
 * AccountHero · V6 C1-A-R1
 * Global Scenic Hero（白鹿大幅场景层，独立于Header/Content）
 * 字阶：Scenic Hero专用（standard 76/92、long 68/70），禁用Compact字阶
 * R1变更：长标题由Page Manifest显式指定titleMode，组件不做自动判断；
 *         移除children插槽，未批准结构不得注入。
 */

export interface AccountHeroProps {
  /** 主标题 */
  title: string;
  /** 字阶模式：由Page Manifest决定，组件不自行判断 */
  titleMode?: "standard" | "long";
  /** 眉题（大写小字，可省） */
  eyebrow?: string;
  /** 副题（最多3行，超出clamp） */
  subtitle?: string;
  /** 橙色提示行（可省） */
  notice?: string;
  /** 场景背景图（正式资产须无字；DEV占位必须带fixture标记） */
  bgSrc?: string;
  bgAlt?: string;
  /** DEV占位标记：true时输出data-dh-fixture，Gate O1必须为0 */
  bgIsDevFixture?: boolean;
}

export function AccountHero({
  title,
  titleMode = "standard",
  eyebrow,
  subtitle,
  notice,
  bgSrc,
  bgAlt = "",
  bgIsDevFixture = false,
}: AccountHeroProps) {
  return (
    <section
      className="dhv6-hero dh-scope"
      data-dh-component="AccountHero"
      aria-label={title}
    >
      {bgSrc ? (
        <div
          className="dhv6-hero__bg"
          data-dh-fixture={bgIsDevFixture ? "dev-only" : undefined}
        >
          <img src={bgSrc} alt={bgAlt} />
        </div>
      ) : null}
      <div className="dhv6-hero__inner">
        {eyebrow ? <p className="dhv6-hero__eyebrow">{eyebrow}</p> : null}
        <h1 className="dhv6-hero__title" data-title-mode={titleMode}>
          {title}
        </h1>
        {subtitle ? (
          <p className="dhv6-hero__subtitle dh-clamp-3">{subtitle}</p>
        ) : null}
        {notice ? <p className="dhv6-hero__notice">{notice}</p> : null}
      </div>
    </section>
  );
}

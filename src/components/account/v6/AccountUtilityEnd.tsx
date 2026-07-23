/**
 * AccountUtilityEnd · V6 C1-A-R1
 * 页面工具尾区（独立层；FooterGrid是内容组件，不得替代本层）
 * 高度规格：PC 280 / Mobile 220 = min-height（Governance Core）
 */

export interface UtilityEndLink {
  label: string;
  href: string;
  /** 政策入口等治理链接由Page Manifest提供，组件不自定义 */
  disabled?: boolean;
}

export interface AccountUtilityEndProps {
  links: UtilityEndLink[];
  /** 版权行全文（来自Manifest，组件不拼接年份） */
  copyright: string;
}

/**
 * R1变更：移除children插槽——未批准结构不得注入冻结组件。
 * FooterGrid等内容组件在页面层排布于本层之上，不进入本层内部。
 * 高度规格 --dh-end-h 为 min-height（禁固定height裁切，内容自然撑开）。
 */
export function AccountUtilityEnd({ links, copyright }: AccountUtilityEndProps) {
  return (
    <footer className="dhv6-end dh-scope" data-dh-component="AccountUtilityEnd">
      <div className="dhv6-end__inner">
        <nav className="dhv6-end__links" aria-label="Account utility links">
          {links.map((l) =>
            l.disabled ? (
              <span
                key={l.label}
                className="dhv6-end__link"
                data-dh-state="disabled"
              >
                {l.label}
              </span>
            ) : (
              <a
                key={l.label}
                className="dhv6-end__link dh-focusable"
                href={l.href}
              >
                {l.label}
              </a>
            ),
          )}
        </nav>
        <p className="dhv6-end__copy">{copyright}</p>
      </div>
    </footer>
  );
}

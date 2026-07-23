/**
 * AccountGlobalHeader · V6 C1-A-R1
 * 全局导航头（独立层，禁与Hero/Content合并）
 * R1变更：actions从任意ReactNode改为受控typed数组；
 *         头像语义为Header Avatar（尺寸复用44px档仅为别名，非Help资产语义）；
 *         新增DEV fixture标记支持（logo/action图标）。
 */

export interface HeaderActionItem {
  /** DH小标资产（Control角色32/18；Asset ID由Page Manifest指定） */
  iconSrc: string;
  /** Accessibility名称 */
  label: string;
  href?: string;
  disabled?: boolean;
  /** DEV占位资产标记（Gate O1必须为0） */
  iconIsDevFixture?: boolean;
}

export interface AccountGlobalHeaderProps {
  /** DOHARA Logo资产（Asset ID由Page Manifest指定） */
  logoSrc: string;
  logoAlt?: string;
  /** logo为DEV占位资产时必须标记 */
  logoIsDevFixture?: boolean;
  /** 会员名（PC显示，Mobile隐藏） */
  memberName?: string;
  /** Header Avatar资产（会员头像，非图标语义） */
  avatarSrc?: string;
  avatarIsDevFixture?: boolean;
  /** 动作项（受控数组，禁止注入任意结构） */
  actions?: HeaderActionItem[];
  /** 整体锁定态（未登录等场景） */
  state?: "normal" | "locked";
}

function HeaderIconButton({
  iconSrc,
  label,
  href,
  disabled,
  iconIsDevFixture,
}: HeaderActionItem) {
  const cls = "dhv6-header__iconbtn dh-focusable dh-touch";
  const fixture = iconIsDevFixture ? "dev-only" : undefined;
  const img = <img src={iconSrc} alt="" aria-hidden="true" />;
  if (href && !disabled) {
    return (
      <a className={cls} href={href} aria-label={label} data-dh-fixture={fixture}>
        {img}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      aria-label={label}
      disabled={disabled}
      data-dh-state={disabled ? "disabled" : undefined}
      data-dh-fixture={fixture}
    >
      {img}
    </button>
  );
}

export function AccountGlobalHeader({
  logoSrc,
  logoAlt = "DOHARA",
  logoIsDevFixture = false,
  memberName,
  avatarSrc,
  avatarIsDevFixture = false,
  actions,
  state = "normal",
}: AccountGlobalHeaderProps) {
  return (
    <header
      className="dhv6-header dh-scope"
      data-dh-state={state === "locked" ? "locked" : undefined}
      data-dh-component="AccountGlobalHeader"
    >
      <div
        className="dhv6-header__logo"
        data-dh-fixture={logoIsDevFixture ? "dev-only" : undefined}
      >
        <img src={logoSrc} alt={logoAlt} />
      </div>
      <div className="dhv6-header__actions">
        {actions?.map((a) => <HeaderIconButton key={a.label} {...a} />)}
        {memberName ? (
          <span className="dhv6-header__name dh-ellipsis">{memberName}</span>
        ) : null}
        {avatarSrc ? (
          <span
            className="dhv6-header__avatar"
            data-dh-fixture={avatarIsDevFixture ? "dev-only" : undefined}
          >
            <img src={avatarSrc} alt={memberName ?? "Member avatar"} />
          </span>
        ) : null}
      </div>
    </header>
  );
}

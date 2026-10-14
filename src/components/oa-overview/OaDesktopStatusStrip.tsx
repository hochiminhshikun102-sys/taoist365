import Link from "next/link";

type OaDesktopStatus = "read_only" | "not_connected";

type Props = {
  moduleLabel: string;
  status: OaDesktopStatus;
  nextHref?: string;
  nextLabel?: string;
};

const STATUS_COPY: Record<OaDesktopStatus, string> = {
  read_only: "read_only · 只读",
  not_connected: "not_connected · 未接通",
};

/** Shared desktop status chrome. Fixture UI only — not a Provider. */
export function OaDesktopStatusStrip({ moduleLabel, status, nextHref, nextLabel }: Props) {
  return (
    <div className="oa-desktop-status" data-oa-desktop-status={status}>
      <div className="oa-capability-row oa-desktop-status-row">
        <span className={`oa-capability-pill is-${status}`}>{STATUS_COPY[status]}</span>
        <span className="oa-capability-pill is-not_connected">Provider disabled · 未接通</span>
        <span className="oa-capability-pill is-not_connected">Production deploy disabled</span>
        <span className="oa-capability-pill is-not_connected">Real write disabled · FALSE</span>
        <span className="oa-capability-owner">
          {moduleLabel} · OA desktop readonly · no live Provider
        </span>
      </div>
      {nextHref && nextLabel ? (
        <div className="oa-desktop-status-next">
          <Link className="oa-btn secondary" href={nextHref}>
            {nextLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

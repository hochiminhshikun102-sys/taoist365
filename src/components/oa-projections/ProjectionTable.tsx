import { formatMinor, statusLabel } from "@/lib/oa-orders/format";
import type { OrderProjectionRow } from "@/lib/oa-projections/types";

type Props = {
  rows: OrderProjectionRow[];
  emptyLabel?: string;
};

export function ProjectionTable({ rows, emptyLabel = "No DEMO projection rows" }: Props) {
  if (rows.length === 0) {
    return <p className="oa-skeleton-meta">{emptyLabel}</p>;
  }

  return (
    <div className="oa-orders-table-wrap">
      <table className="oa-table">
        <thead>
          <tr>
            <th>order_number</th>
            <th>order_status</th>
            <th>payment</th>
            <th>fulfillment</th>
            <th>refund</th>
            <th>risk</th>
            <th>amount</th>
            <th>items</th>
            <th>packages</th>
            <th>last_event_at</th>
            <th>source_route</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.order_id}-${row.source_route}-${row.last_event_at}`}>
              <td>
                <strong>{row.order_number}</strong>
                <div className="oa-skeleton-meta">{row.order_id}</div>
              </td>
              <td>{statusLabel(row.order_status)}</td>
              <td>{statusLabel(row.payment_status)}</td>
              <td>{statusLabel(row.fulfillment_status)}</td>
              <td>{statusLabel(row.refund_status)}</td>
              <td>{statusLabel(row.risk_status)}</td>
              <td>{formatMinor(row.amount_minor, row.currency)}</td>
              <td>{row.items_count}</td>
              <td>{row.package_count}</td>
              <td>{row.last_event_at}</td>
              <td>
                <code>{row.source_route}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

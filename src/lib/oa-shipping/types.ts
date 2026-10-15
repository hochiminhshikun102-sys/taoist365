export type ShippingWorkbenchStatus =
  | "ready_to_ship"
  | "in_transit"
  | "exception"
  | "return_logistics"
  | "handoff";

export type ShippingWorkbenchViewState =
  | "ready"
  | "loading"
  | "empty"
  | "failed"
  | "not_connected"
  | "auth_required"
  | "permission_denied"
  | "provider_unavailable"
  | "demo";

export type OaShipmentRecord = {
  row_key: string;
  order_id: string;
  order_number: string;
  line_id: string;
  shipment_id: string;
  fulfillment_status: string;
  source_fulfillment_status: string;
  shipment_status: string;
  fulfillment_source: string;
  carrier: string;
  tracking_ref: string;
  warehouse_ref: string;
  handoff_status: string;
  exception_status: string;
  updated_at: string;
  queue_tags: ShippingWorkbenchStatus[];
  shipment_known: boolean;
  tracking_known: boolean;
  carrier_known: boolean;
  warehouse_known: boolean;
  handoff_known: boolean;
  exception_known: boolean;
};

export type ShippingWorkbenchStatus =
  | "ready_to_ship"
  | "in_transit"
  | "exception"
  | "return_logistics"
  | "handoff";

export type OaShipmentRecord = {
  order_id: string;
  order_number: string;
  line_id: string;
  shipment_id: string;
  fulfillment_status: string;
  shipment_status: string;
  fulfillment_source: string;
  carrier: string;
  tracking_ref: string;
  warehouse_ref: string;
  handoff_status: string;
  exception_status: string;
  updated_at: string;
  queue_tags: ShippingWorkbenchStatus[];
};

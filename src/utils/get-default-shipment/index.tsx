import { Shipment } from "@/contexts/cart/types";

export function getDefaultShipment(items: Shipment[]) {
  return items?.find((item) => item.default_shipment === true) || null
}

export function hasNoAvailableShipments(items: any) {
  return items?.some((item: any) => !item || item?.available_shipments?.length === 0);
}

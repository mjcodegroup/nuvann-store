import { Shipment } from "@/contexts/cart/types";

export function getDefaultShipment(items: Shipment[]) {
  return items?.find((item) => item.default_shipment === true) || null
}
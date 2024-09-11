import { Cart } from "@/contexts/cart/types";

export interface CartProps {
    data: Cart
    removeFromCart: (id: number) => Promise<void>;
}

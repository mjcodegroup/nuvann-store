import { Cart } from "@/contexts/cart/types";

export interface CartProps {
    data: Cart
    fullLoader: boolean;
    removeFromCart: (id: number) => Promise<void>;
    onIncrementButton: (items: any, index: number) => void;
    onDecrementButton: (index: number, quantity: number) => void;
    onCheckout: () => void;
    disableIncrementAndDecrementBtn: boolean;
}

export interface CartCardProps {
    data: Cart;
    removeFromCart: (id: number) => Promise<void>;
    onIncrementButton: (item: any, position: number) => void;
    onDecrementButton: (item: any, position: number) => void;
    disableIncrementAndDecrementBtn: boolean;
}

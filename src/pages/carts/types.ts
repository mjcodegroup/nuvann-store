import { Cart } from "@/contexts/cart/types";

export interface CartProps {
    data: Cart
    removeFromCart: (id: number) => Promise<void>;
    onIncrementButton: (items: any, index: number) => Promise<void>;
    onDecrementButton: (index: number, quantity: number) => Promise<void>;
    onCheckout: () => void;
}

export interface CartCardProps {
    data: Cart;
    removeFromCart: (id: number) => Promise<void>;
    onIncrementButton: (item: any, position: number) => Promise<void>;
    onDecrementButton: (item: any, position: number) => Promise<void>;
}

export interface CartResumeProps {
    data: Cart;
    OnCheckout: () => void;
}

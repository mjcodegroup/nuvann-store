import { Cart } from "@/contexts/cart/types";

export interface CartProps {
    data: Cart
    removeFromCart: (id: number) => Promise<void>;
    onIncrementButton: (index: number, quantity: number) => Promise<void>;
    onDecrementButton: (index: number, quantity: number) => Promise<void>;
    onCheckout: () => void;
}

export interface CartCardProps {
    data: Cart;
    removeFromCart: (id: number) => Promise<void>;
    onIncrementButton: (index: number, quantity: number) => Promise<void>;
    onDecrementButton: (index: number, quantity: number) => Promise<void>;
}

export interface CartResumeProps {
    data: Cart;
    OnCheckout: () => void;
}

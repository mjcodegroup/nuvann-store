import { Cart } from "@/contexts/cart/types";

export interface CartProps {
    data: Cart
    removeFromCart: (id: number) => Promise<void>;
    onIncrementButton: (index: number) => void;
    onDecrementButton: (index: number) => void;
    onCheckout: () => void;
}

export interface CartCardProps {
    data: Cart;
    removeFromCart: (id: number) => Promise<void>;
    onIncrementButton: (index: number) => void;
    onDecrementButton: (index: number) => void;
}

export interface CartResumeProps {
    data: Cart;
    OnCheckout: () => void;
}

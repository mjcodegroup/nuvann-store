import { formatMoney } from "./format-money.util";

export function formatPrice(amount: number, currencyCode: string = 'BRL'): string {
    if (amount === 0) {
        return 'free_text'
    }
    return formatMoney(amount, currencyCode);
}
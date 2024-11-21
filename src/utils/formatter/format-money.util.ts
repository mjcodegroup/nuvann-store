export function formatMoney(amount: number, currencyCode: string = 'BRL') {
    try {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currencyCode,
        }).format(amount);
    } catch (error) {
        console.error(`Invalid currency code: "${currencyCode}"`, error);
        return amount.toFixed(2);
    }
}
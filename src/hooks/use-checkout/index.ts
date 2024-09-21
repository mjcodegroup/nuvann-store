import { useCheckout } from "@/contexts/checkout";
import { nuvannApi } from "@/services/api";
import { useEffect } from "react";

export function useCheckoutInfo() {
    const { state: checkoutState, dispatch: checkoutDispatch } = useCheckout();

    async function getCheckout() {
        checkoutDispatch({ type: 'SET_LOADING', value: true });
        try {
            const response = await nuvannApi.get('/checkout/items')
            checkoutDispatch({ type: 'SET_CHECKOUT', value: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            checkoutDispatch({ type: 'SET_LOADING', value: false });
        }
    }

    useEffect(() => {
        getCheckout();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return {
        loading: checkoutState.loading,
        getCheckout,
    }
}
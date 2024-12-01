import { useCheckout } from "@/contexts/checkout";
import { ShipmentInfosTypes, ShippingInfoTypes } from "@/contexts/checkout/types";
import { useToast } from "@/contexts/toast";
import { nuvannApi } from "@/services/api";
import React, { useEffect } from "react";
import { useUserInfo } from "../use-user-info";

export function useCheckoutInfo(orderId?: string) {
    const { state: checkoutState, dispatch: checkoutDispatch } = useCheckout();
    const{getUserInfo} = useUserInfo();
  const { successToast, errorToast } = useToast();
  const [openModalAddress, setOpenModalAddress] = React.useState(false);
  const [openModalShipment, setOpenModalShipment] = React.useState(false);

    async function getCheckout() {
        checkoutDispatch({ type: 'SET_LOADING', value: true });
        const hasquery = orderId ? `?order_id=${orderId}` : '';
        try {
            const response = await nuvannApi.get('/checkout/items' + hasquery);
            checkoutDispatch({ type: 'SET_CHECKOUT', value: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            checkoutDispatch({ type: 'SET_LOADING', value: false });
        }
    }

    async function updateShippingInfo(data: ShippingInfoTypes) {
        checkoutDispatch({ type: 'SET_UPDATE_SHIPPINGINFOS_LOADING', value: true });
        try {
            await nuvannApi.patch('/checkout/shipping/change-info', data)
            successToast('Shipping info updated');
            setOpenModalAddress(false);
            getUserInfo();
            getCheckout();
        } catch (error: any) {
            console.log(error)
            errorToast(error.response.data.message);

        } finally {
            checkoutDispatch({ type: 'SET_UPDATE_SHIPPINGINFOS_LOADING', value: false });
        }
    }

    async function handlePlaceOrder(order_id?: string): Promise<void> {
        checkoutDispatch({ type: 'PLACE_ORDER_LOADING', value: true });
        try {
            const response = await nuvannApi.post('/checkout/place-order', {
                call_back_urls: {
                    on_success: process.env.NEXT_PUBLIC_CHECKOUT_URL_ON_SUCCESS,
                    on_cancel: process.env.NEXT_PUBLIC_CHECKOUT_URL_ON_CANCEL
                },
                order_id: order_id || undefined 
            });
            successToast('Order placed successfully');
            window.location.href = response.data.checkout_url;
        } catch (error: any) {
            errorToast(error.response.data.message);
        } finally {
            checkoutDispatch({ type: 'PLACE_ORDER_LOADING', value: false });
        }
    }

    async function updateShipmentInfos(data: ShipmentInfosTypes) {
        checkoutDispatch({ type: 'SET_UPDATE_SHIPPINGINFOS_LOADING', value: true });
        try {
            await nuvannApi.patch(`/checkout/orders/${data.orderId}/business/${data.businessId}/shipments/${data.shipmentId}`)
            successToast('Shipping info updated');
            setOpenModalShipment(false);
            getCheckout();
        } catch (error: any) {
            console.log(error)
            errorToast(error.response.data.message);

        } finally {
            checkoutDispatch({ type: 'SET_UPDATE_SHIPPINGINFOS_LOADING', value: false });
        }
    }

    useEffect(() => {
        getCheckout();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [orderId]);

    return {
        checkout: checkoutState.checkout,
        loading: checkoutState.loading,
        getCheckout,
        updateShippingInfoLoading: checkoutState.updateShippingInfosLoading,
        updateShippingInfo,
        openModalAddress,
        setOpenModalAddress,
        handlePlaceOrder,
        placeOrderLoader: checkoutState.placeOrderLoading,
        openModalShipment,
        setOpenModalShipment,
        updateShipmentInfos,
    }
}
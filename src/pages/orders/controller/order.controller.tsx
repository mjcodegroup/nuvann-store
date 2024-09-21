import React, { useEffect } from 'react';
import { HomePageDefault } from '@/components/home-page-default';
import { useOrdersInfo } from '@/hooks/use-orders-info';
import Orders from '../components/order';

export default function OrdersController() {
    const { getOrders, isLoading } = useOrdersInfo();

    async function getOrdersInformations() {
        try {
            await getOrders();
        } catch (error) {
            console.log('Something went wrong');
        }
    }

    useEffect(() => {
      getOrdersInformations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCheckout = () => {
        alert('Checkout');
    };

    return (
        <HomePageDefault>
            <Orders />
        </HomePageDefault>
    );
}

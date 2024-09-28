import React, { useEffect } from 'react';
import { HomePageDefault } from '@/components/home-page-default';
import { useOrdersInfo } from '@/hooks/use-orders-info';
import Orders from '../view';

export default function OrdersController() {
    const { orders, getOrders, isLoading } = useOrdersInfo();

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <HomePageDefault>
            <Orders orders={orders} isLoading={isLoading} />
        </HomePageDefault>
    );
}

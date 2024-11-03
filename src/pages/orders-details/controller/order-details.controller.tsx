import React from 'react';
import { useRouter } from 'next/router';
import { HomePageDefault } from '@/components/home-page-default';
import OrderDetails from '../view';
import { useOrdersDetailsInfo } from '@/hooks/use-order-details-info';
import OrdersCardSkeleton from '../../orders/components/orders-card-skeleton';
import { useEffect } from 'react';

export default function OrderDetailsController() {
    const router = useRouter();
    const { orderId } = router.query;
    const { order, isLoading, getOrderDetails } = useOrdersDetailsInfo();

    useEffect(() => {
        if(orderId){
            getOrderDetails(orderId as string);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);

    return (
        <HomePageDefault>
            {isLoading ? (
                <OrdersCardSkeleton />
            ) : (
                <OrderDetails order={order} isLoading={isLoading} />
            )}
        </HomePageDefault>
    );
}

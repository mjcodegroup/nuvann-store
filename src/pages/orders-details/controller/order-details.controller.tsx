import React from 'react';
import { useRouter } from 'next/router';
import { HomePageDefault } from '@/components/home-page-default';
import OrderDetails from '../view';
import { useOrdersDetailsInfo } from '@/hooks/use-order-details-info';
import { useEffect } from 'react';
import OrderDetailsSkeleton from '../components/orders-card-skeleton';

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
                <OrderDetailsSkeleton />
            ) : (
                <OrderDetails order={order} isLoading={isLoading} />
            )}
        </HomePageDefault>
    );
}

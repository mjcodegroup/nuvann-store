import React from 'react';
import { useRouter } from 'next/router';
import { HomePageDefault } from '@/components/home-page-default';
import OrderDetails from '../view';
import { useOrdersDetailsInfo } from '@/hooks/use-order-details-info';
import OrdersCardSkeleton from '../../orders/components/orders-card-skeleton'; // Import the skeleton

export default function OrderDetailsController() {
    const router = useRouter();
    const { orderId } = router.query;
    const { order, isLoading } = useOrdersDetailsInfo(orderId as string);

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

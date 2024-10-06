import React from 'react';
import { useRouter } from 'next/router';
import { HomePageDefault } from '@/components/home-page-default';
import OrderDetails from '../view';
import { useOrdersDetailsInfo } from '@/hooks/use-order-details-info';

export default function OrderDetailsController() {
    const router = useRouter();
    const { orderId } = router.query;
    const { order, isLoading } = useOrdersDetailsInfo(orderId as string);
    return (
        <HomePageDefault>
            {(
                <OrderDetails order={order} isLoading={isLoading} />
            )}
        </HomePageDefault>
    );
}

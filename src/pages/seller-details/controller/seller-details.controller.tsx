import React from 'react';
import { useRouter } from 'next/router';
import { HomePageDefault } from '@/components/home-page-default';
import SellerDetails from '../view';
import SellerCardSkeleton from '../components/seller-card-skeleton';
import { useSellerDetailsInfo } from '@/hooks/use-seller-details-info';

export default function SellerDetailsController() {
    const router = useRouter();
    const { orderId } = router.query;
    const { order, isLoading } = useSellerDetailsInfo(orderId as string);

    return (
        <HomePageDefault>
            {isLoading ? (
                <SellerCardSkeleton />
            ) : (
                <SellerDetails seller={order} isLoading={isLoading} />
            )}
        </HomePageDefault>
    );
}

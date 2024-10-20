import React from 'react';
import { useRouter } from 'next/router';
import { HomePageDefault } from '@/components/home-page-default';
import SellerDetails from '../view';
import SellerCardSkeleton from '../components/seller-card-skeleton';
import { useSellerDetailsInfo } from '@/hooks/use-seller-details-info';

export default function SellerDetailsController() {
    const router = useRouter();
    const { orderId } = router.query;
    const { products, isLoading } = useSellerDetailsInfo(orderId as string);

    const handleRedirectToProductDetails = (id: string) => {
        router.push(`/products/${id}`);
    };

    return (
        <HomePageDefault>
            {isLoading ? (
                <SellerCardSkeleton />
            ) : (
                <SellerDetails 
                    isLoading={isLoading} 
                    products={products}
                    onRedirectToProductDetails={handleRedirectToProductDetails} 
                />
            )}
        </HomePageDefault>
    );
}

import React from 'react';
import { useRouter } from 'next/router';
import { HomePageDefault } from '@/components/home-page-default';
import SellerDetails from '../view';
import SellerCardSkeleton from '../components/seller-card-skeleton';
import { useSellerDetailsInfo } from '@/hooks/use-seller-details-info';
import { useNavigation } from '@/hooks/useNavigation';
import { RoutesUrls } from '@/utils/enums/routesUrl';

export default function SellerDetailsController() {
    const router = useRouter();
    const { redirect } = useNavigation();
    const { orderId, name, country, createdAt } = router.query;
    const sellerName = Array.isArray(name) ? name[0] : name || '';
    const sellerCountry = Array.isArray(country) ? country[0] : country || '';
    const sellerCreatedAt = Array.isArray(createdAt) ? createdAt[0] : createdAt || '';
    const { products, isLoading } = useSellerDetailsInfo(orderId as string);
    const handleRedirectToProductDetails = React.useCallback((id: string | number) => {
        redirect(`/product/${id}` as RoutesUrls);
    }, [redirect]);

    return (
        <HomePageDefault>
            {isLoading ? (
                <SellerCardSkeleton />
            ) : (
                <SellerDetails 
                    isLoading={isLoading} 
                    products={products}
                    onRedirectToProductDetails={handleRedirectToProductDetails} 
                    sellerName={sellerName}
                    sellerCountry={sellerCountry}
                    createdAt={sellerCreatedAt}
                />
            )}
        </HomePageDefault>
    );
}

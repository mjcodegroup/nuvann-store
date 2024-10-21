import React from 'react';
import styles from './seller-details.module.scss';
import { MdDateRange, MdLocationOn, MdPerson, MdShoppingCart } from 'react-icons/md';
import SellerCardSkeleton from '../components/seller-card-skeleton';
import ProductCard from '../components/product';
import { ProductsData } from '@/contexts/products/types';
import { getYearFromDate } from '@/utils/date-convert';

interface SellerDetailsProps {
    isLoading: boolean;
    products: ProductsData;
    onRedirectToProductDetails: (id: string) => void;
    sellerName: string;
    sellerCountry: string;
    createdAt: string;
}

export default function SellerDetails({ isLoading, products, onRedirectToProductDetails, sellerName, sellerCountry, createdAt}: SellerDetailsProps) {
    console.log( sellerName, sellerCountry, createdAt);
    if (isLoading) {
        return <SellerCardSkeleton />;
    }

    return (
        <div className={styles.sellerContainer}>
            <div className={styles.sellerCard}>
                <MdPerson className={styles.sellerIcon} size={100} />
                <h3>{sellerName}</h3>
                <div className={styles.sellerStats}>
                    <div>
                        <h5>Seller Since</h5>
                        <p><MdDateRange className={styles.icon}/>{getYearFromDate(createdAt)}</p> {/* Display the created date */}
                    </div>
                    <div>
                        <h5>Total Products</h5>
                        <p><MdShoppingCart className={styles.icon} />{products.total_items}</p>
                    </div>
                    <div>
                        <h5>Location</h5>
                        <p><MdLocationOn className={styles.icon}/>{sellerCountry}</p>
                    </div>
                </div>
            </div>

            <div className={styles.productList}>
                <h4>Products</h4>
                <ul>
                    {Array.isArray(products.items) && products.items.length > 0 ? (
                        products.items.map((product) => (
                            <li key={product.id}>
                                <ProductCard product={product} onRedirectToProductDetails={onRedirectToProductDetails} />
                            </li>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

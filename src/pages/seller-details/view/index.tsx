import React from 'react';
import styles from './seller-details.module.scss';
import { MdDateRange } from 'react-icons/md';
import { BiStore } from 'react-icons/bi';
import SellerCardSkeleton from '../components/seller-card-skeleton';
import ProductCard from '../components/product';
import { ProductsData } from '@/contexts/products/types';
import { getYearFromDate } from '@/utils/date-convert';
import { HiOutlineArchiveBox } from 'react-icons/hi2';
import { CiLocationOn } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';

interface SellerDetailsProps {
    isLoading: boolean;
    products: ProductsData;
    onRedirectToProductDetails: (id: string) => void;
    sellerName: string;
    sellerCountry: string;
    createdAt: string;
}

export default function SellerDetails({ isLoading, products, onRedirectToProductDetails, sellerName, sellerCountry, createdAt}: SellerDetailsProps) {
    const { t } = useTranslation('seller_page');

    if (isLoading) {
        return <SellerCardSkeleton />;
    }

    return (
        <div className={styles.sellerContainer}>
            <div className={styles.sellerCard}>
                <div className={styles.seller_pic}>
                    <BiStore className={styles.sellerIcon} size={120} />
                    <h3>{sellerName}</h3>
                </div>
                <div className={styles.sellerStats}>
                    <div>
                        <h5>{t('seller_since')}</h5>
                        <p ><MdDateRange className={styles.icon}/>{getYearFromDate(createdAt)}</p> {/* Display the created date */}
                    </div>
                    <div>
                        <h5>{t('total_products')}</h5>
                        <p><HiOutlineArchiveBox className={styles.icon} />{products.total_items}</p>
                    </div>
                    <div>
                        <h5>{t('location')}</h5>
                        <p><CiLocationOn className={styles.icon}/>{sellerCountry}</p>
                    </div>
                </div>
            </div>

            <div className={styles.productList}>
                <h4>{t('products')}</h4>
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

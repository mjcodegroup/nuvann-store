import React from 'react';
import styles from './seller-details.module.scss';
import { MdPerson } from 'react-icons/md';
import SellerCardSkeleton from '../components/seller-card-skeleton';
import ProductCard from '../components/product';
import { ProductsData } from '@/contexts/products/types';

interface SellerDetailsProps {
    isLoading: boolean;
    products: ProductsData;
    onRedirectToProductDetails: (id: string) => void;
}

export default function SellerDetails({ isLoading, products, onRedirectToProductDetails }: SellerDetailsProps) {
    console.log(products.items);
    if (isLoading) {
        return <SellerCardSkeleton />;
    }

    return (
        <div className={styles.sellerContainer}>
            <div className={styles.sellerCard}>
                {/* {seller?.picture ? (
                    <Image
                        src={seller.picture}
                        alt={`${seller.name}'s profile`}
                        className={styles.sellerImage}
                        width={100}
                        height={100}
                    />
                ) :  */}
                <MdPerson className={styles.sellerIcon} size={100} />
                <h3>Seller name</h3>
                <p className={styles.sellerEmail}>📧 selleremail@gmail.com</p>
                <button className={styles.contactSellerButton}>Contact Seller</button>

                <div className={styles.sellerStats}>
                    <h4>Seller Ratings</h4>
                    <div className={styles.statsBox}>
                        <div>
                            <h5>🌟 4.8/5</h5>
                            <p>Average Rating</p>
                        </div>
                        <div>
                            <h5>500</h5>
                            <p>Reviews</p>
                        </div>
                        <div>
                            <h5>1000+</h5>
                            <p>Products Sold</p>
                        </div>
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

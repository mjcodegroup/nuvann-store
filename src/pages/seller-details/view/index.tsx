import React from 'react';
import styles from './seller-details.module.scss';
import { User } from '@auth0/auth0-react';
import Image from 'next/image';
import { MdPerson } from 'react-icons/md'; // Import person icon
import SellerCardSkeleton from '../components/seller-card-skeleton';

interface SellerDetailsProps {
    seller: User;
    isLoading: boolean;
}

export default function SellerDetails({ seller, isLoading }: SellerDetailsProps) {
    if (isLoading) {
        return <SellerCardSkeleton />;
    }

    return (
        <div className={styles.sellerContainer}>
            <div className={styles.sellerCard}>
                {seller?.picture ? (
                    <Image
                        src={seller.picture}
                        alt={`${seller.name}'s profile`}
                        className={styles.sellerImage}
                        width={100}
                        height={100}
                    />
                ) : (
                    <MdPerson className={styles.sellerIcon} size={100} />
                )}
                <h3>{seller.name}</h3>
                <p className={styles.sellerEmail}>📧 {seller.email}</p>
                <button className={styles.contactSellerButton}>Contact Seller</button>
            </div>
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
    );
}

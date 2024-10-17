import React, { useState, useEffect } from 'react';
import styles from './seller-details.module.scss';
import { Order } from '@/contexts/orders/types';
import { User } from '@auth0/auth0-react';
import SellerCardSkeleton from '../components/seller-card-skeleton';

interface SellerDetailsProps {
    seller: User;
    isLoading: boolean;
}

export default function SellerDetails({ seller, isLoading }: SellerDetailsProps) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);



   

    if (isLoading) {
        return <SellerCardSkeleton />;
    }

    return (
        <div className={styles.AchasHolder}>
            <div className={styles.PurchaseCards}>
                <h3>Seller Page:</h3>
                <div className={styles.concatenate}>
                    <span>
                    </span>
                </div>
            </div>
        </div>
    );
}

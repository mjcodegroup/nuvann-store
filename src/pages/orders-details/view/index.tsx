import React, { useState, useEffect } from 'react';
import styles from './orders-details.module.scss';
import { Order } from '@/contexts/orders/types';
import OrdersCardSkeleton from '../../orders/components/orders-card-skeleton';
import OrderSubCard from '../components/order-subtile-card';
import OrdersResume from '../components/order-resume';

interface OrderDetailsProps {
    order: Order;
    isLoading: boolean;
}

export default function OrderDetails({ order, isLoading }: OrderDetailsProps) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (!isLoading) {
            setSelectedOrder(order);
        }
    }, [order, isLoading]); // Add isLoading as a dependency

    console.log('IN the view...');
    console.log(order);

    // Show skeleton when loading
    if (isLoading) {
        return <OrdersCardSkeleton />;
    }

    return (
        <div className={styles.AchasHolder}>
            <div className={styles.PurchaseCards}>
                <h3>Track your order:</h3>
                <div className={styles.PurchaseScroll}>
                    <div key={order?.id}>
                        <OrderSubCard order={order} />
                    </div>
                </div>
            </div>

            <div className={styles.OrdersResume}>
                {selectedOrder ? (
                    <OrdersResume
                        data={{
                            count: selectedOrder.quantity || 0,
                            sub_total: selectedOrder.sub_total || 0,
                            shipping_cost: selectedOrder.shipping_cost || 0,
                            total: selectedOrder.total_price || 0,
                        }}
                        order={selectedOrder}
                        OnCheckout={() => {/* Implement checkout logic */ }}
                        loading={isLoading}
                    />
                ) : (
                    <div className={styles.NoOrderSelected}>
                        <h4>Select an order to view details</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

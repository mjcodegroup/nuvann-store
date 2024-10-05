import React, { useState } from 'react';
import styles from './orders-details.module.scss';
import { Order } from '@/contexts/orders/types';
import OrdersCardSkeleton from '../../orders/components/orders-card-skeleton';
import OrderSubCard from '../../orders/components/order-subtile-card';
import OrdersResume from '../../orders/components/order-resume';

interface OrderDetailsProps {
    order: Order;
    isLoading: boolean;
}

export default function OrderDetails({ order, isLoading }: OrderDetailsProps) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const handleExpandToggle = (orderId: string) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    React.useEffect(() => {
        setSelectedOrder(order);
    }, [order]);

    return (
        <>
            {isLoading ? (
                <OrdersCardSkeleton />
            ) : (
                <div className={styles.AchasHolder}>
                    <div className={styles.PurchaseCards}>
                        <h3>Detail:</h3>
                        <div className={styles.PurchaseScroll}>
                            <div key={order?.id}>
                                {expandedOrderId === order?.id && <OrderSubCard order={order} />}
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
            )}
        </>
    );
}

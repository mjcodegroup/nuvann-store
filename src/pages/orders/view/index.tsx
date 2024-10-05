import React, { useState } from 'react';
import styles from './style.module.scss';
import CustomButton from '@/components/custom-button';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useNavigation } from '@/hooks/useNavigation';
import OrdersCardSkeleton from '../components/orders-card-skeleton';
import OrdersResume from '../components/order-resume';
import { Order } from '@/contexts/orders/types';
import OrderCard from '../components/order-card';
import OrderSubCard from '../components/order-subtile-card';

interface OrdersProps {
    orders: Order[];
    isLoading: boolean;
}

export default function Orders({ orders, isLoading }: OrdersProps) {
    const { redirect } = useNavigation();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order);
    };

    const handleExpandToggle = (orderId: string) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    React.useEffect(() => {
        if (orders.length > 0 && !selectedOrder) {
            setSelectedOrder(orders[0]);
        }
    }, [orders, selectedOrder]);

    return (
        <>
            {isLoading ? (
                <OrdersCardSkeleton />
            ) : orders.length === 0 ? (
                <div className={styles.AchasHolder2}>
                    <div className={styles.messageAnyen}>
                        <h3>Ou poko achte anyen !!</h3>
                        <CustomButton
                            variant="outlined"
                            onClick={() => redirect(RoutesUrls.HOME)}
                            backgroundColor="#000052"
                            textColor="#ffff"
                            width={200}
                            height={35}
                        >
                            Achte
                        </CustomButton>
                    </div>
                </div>
            ) : (
                <div className={styles.AchasHolder}>
                    <div className={styles.PurchaseCards}>
                        <h3>Pwodwi ou achte deja</h3>
                        <div className={styles.PurchaseScroll}>
                            {orders.map((order: Order) => (
                                <div key={order.id}>
                                    <OrderCard
                                        order={order}
                                        selectedOrder={selectedOrder}
                                        expandedOrderId={expandedOrderId}
                                        handleOrderClick={handleOrderClick}
                                        handleExpandToggle={handleExpandToggle}
                                    />
                                    {expandedOrderId === order.id && <OrderSubCard order={order} />}
                                </div>
                            ))}
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

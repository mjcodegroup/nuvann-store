import React, { useState } from 'react';
import styles from './style.module.scss';
import CustomButton from '@/components/custom-button';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useNavigation } from '@/hooks/useNavigation';
import OrdersCardSkeleton from '../components/orders-card-skeleton';
import OrdersResume from '../components/order-resume';
import { Order } from '@/contexts/orders/types';
import Image from 'next/image';

interface OrdersProps {
    orders: Order[];
    isLoading: boolean;
}

export default function Orders({ orders, isLoading }: OrdersProps) {
    const { redirect } = useNavigation();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order);
    };

    React.useEffect(() => {
        if (orders.length > 0) {
            setSelectedOrder(orders[0]);
        }
    }, [orders]);

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
                                <div
                                    className={`${styles.ActualCard} ${order.id === selectedOrder?.id ? styles.selected : ''}`}
                                    key={order.id}
                                    onClick={() => handleOrderClick(order)}
                                >
                                    <Image src={order.product.images[0]?.url} alt="product" width={100} height={100} />
                                    <div className={styles.CardstitleDate}>
                                        <h4>{order.product.name}</h4>
                                        <h5>Dat acha: <span>{order.order_item_status_logs.occurred_on}</span></h5>
                                        <h5>Estati: <span>{order.status}</span></h5>
                                        <h5>Kantite: <span>{order.quantity}</span></h5>
                                        <h5>Delivred by: <span>{order.shipping_tracking_data?.company_name}</span></h5>
                                    </div>
                                    <div className={styles.CardsButtons}>
                                        <button>Wè plis</button> <br />
                                        <button className={styles.Achtebtn}>Achte ankò</button>
                                    </div>
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

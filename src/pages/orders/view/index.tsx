import React, { useState } from 'react';
import styles from './style.module.scss';
import CustomButton from '@/components/custom-button';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useNavigation } from '@/hooks/useNavigation';
import OrdersCardSkeleton from '../components/orders-card-skeleton';
import { Order } from '@/contexts/orders/types';
import OrderCard from '../components/order-card';
import { useTranslation } from 'react-i18next';

interface OrdersProps {
    orders: Order[];
    isLoading: boolean;
}

export default function Orders({ orders, isLoading }: OrdersProps) {
    const { redirect } = useNavigation();
    const { t } = useTranslation('order');

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
                        <h3>{t('no_purchases_yet')}...</h3>
                        <CustomButton
                            variant="outlined"
                            onClick={() => redirect(RoutesUrls.HOME)}
                            backgroundColor="#000052"
                            textColor="#ffff"
                            width={200}
                            height={35}
                        >
                            {t('buy')}
                        </CustomButton>
                    </div>
                </div>
            ) : (
                <div className={styles.AchasHolder}>
                    <div className={styles.PurchaseCards}>
                        <h3>{t('products_already_purchased')}</h3>
                        <div className={styles.PurchaseScroll}>
                            {orders.map((order: Order) => (
                                <div key={order.id}>
                                    <OrderCard
                                        order={order}
                                        handleOrderClick={() => setSelectedOrder(order)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

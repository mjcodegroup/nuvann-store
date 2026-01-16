import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import styles from './orders-details.module.scss';
import { OrderItem } from '@/contexts/orders/types';
import OrderSubCard from '../components/order-subtile-card';
import OrdersResume from '../components/order-resume';
import { useTranslation } from 'react-i18next';
import getDeviceType from '@/utils/get-device-type';
import OrderDetailsSkeleton from '../components/orders-card-skeleton';

interface OrderDetailsProps {
    order: OrderItem;
    isLoading: boolean;
}

export default function OrderDetails({ order, isLoading }: OrderDetailsProps) {
    const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
    const router = useRouter();
    const { t } = useTranslation('order');

    useEffect(() => {
        if (!isLoading) {
            setSelectedOrder(order);
        }
    }, [order, isLoading]);

    const formatAddress = (address?: OrderItem['shipping_address']) => {
        if (!address) return t('no_address_available');
        const {
            street,
            number,
            complement,
            neighborhood,
            city,
            state_or_department,
            zipCode,
            country,
        } = address;
        return `${street}, ${number}${complement ? `, ${complement}` : ''}, ${neighborhood}, ${city} - ${state_or_department}, ${zipCode}, ${country.name}`;
    };

    if (isLoading) {
        return <OrderDetailsSkeleton />;
    }

    return (
        <div className={styles.AchasHolder}>
            <div className={styles.PurchaseCards}>
                <div className={styles.Header}>
                    <h3>{t('order_detail')}:</h3>
                    <button className={styles.BackButton} onClick={() => router.back()}>
                        <AiOutlineArrowLeft />
                        {!getDeviceType.isMobile() ? t('back_to_orders') : ''}
                    </button>
                </div>
                <div className={styles.concatenate}>
                    <span>
                        {t('destination')}: {formatAddress(order.shipping_address)}
                    </span>
                </div>
                <div className={styles.PurchaseScroll}>
                    <div key={order.id}>
                        <OrderSubCard order={order} />
                    </div>
                </div>
            </div>

            <div className={styles.OrdersResume}>
                {selectedOrder ? (
                    <OrdersResume
                        data={{
                            count: selectedOrder.quantity,
                            sub_total: selectedOrder.sub_total,
                            shipping_cost: selectedOrder.shipping_cost || 0,
                            total: selectedOrder.total_price,
                        }}
                        order={selectedOrder}
                        onCheckout={() => {
                            /* Implement checkout logic */
                        }}
                        loading={isLoading}
                    />
                ) : (
                    <div className={styles.NoOrderSelected}>
                        <h4>{t('select_order_to_view_details')}</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

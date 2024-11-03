import React from 'react';
import Image from 'next/image';
import Styles from './order-card.module.scss';
import { Order } from '@/contexts/orders/types';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useNavigation } from '@/hooks/useNavigation';
import CustomButton from '@/components/custom-button';
import { formatDate } from '@/utils/date-convert';
import { useTranslation } from 'react-i18next';
import { useProductsInfo } from '@/hooks/use-products-info';

interface OrderCardProps {
    order: Order;
    selectedOrder: Order | null;
    handleOrderClick: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const { redirect } = useNavigation();
    const { t } = useTranslation('order');
    const {
        handleQuickPurchase,
        quickPurchaseLoader
      } = useProductsInfo();

    const allStatuses = ['AWAITING_PAYMENT', 'PAID', 'PROCESSING', 'SHIPPED', 'CANCELLED', 'DELIVERED'];

    const descriptionStatus = [
        t('waiting_for_payment_confirmation'),
        t('payment_received'),
        t('order_being_prepared'),
        t('order_shipped'),
        t('order_cancelled'),
        t('order_delivered'),
    ];

    const onQuickPurchase = async()=> {
        const colorValue = order?.properties?.additionalProp1?.[0]?.value;
        const sizeValue = order?.properties?.additionalProp2?.[0]?.value;
        const propertyArray = [];
        if (colorValue) {
            propertyArray.push({ color: colorValue });
        }
        if (sizeValue) {
            propertyArray.push({ size: sizeValue });
        }
        handleQuickPurchase(order.product.id, {
            quantity: order?.quantity,
            properties: propertyArray ??  undefined
        })
    }

    const statusIndex = allStatuses.indexOf(order.status);

    const statusDescription = statusIndex !== -1 ? descriptionStatus[statusIndex] : order.status;

    return (
        <div key={order.id}>
            <div className={Styles.ActualCard}>
                <Image src={order.product.images[0]?.url} alt="product" width={100} height={100} />
                <div className={Styles.CardstitleDate}>
                    <h4>{order.product.name}</h4>
                    <h5>{t('purchase_date')}: <span>{formatDate(order.order_item_status_logs[0]?.occurred_on)}</span></h5>
                    <h5>{t('status')}: <span>{statusDescription}</span></h5>
                    <h5>{t('quantity')}: <span>{order.quantity}</span></h5>
                </div>
                <div className={Styles.CardsButtons}>
                    <CustomButton
                        backgroundColor="white"
                        textColor="#000052"
                        onClick={ onQuickPurchase }>
                        {t('buy_again')}
                    </CustomButton>
                    <CustomButton
                        onClick={() => redirect(`${RoutesUrls.ORDERS_DETAILS}?orderId=${order.id}` as RoutesUrls)}>
                        {t('see_more')}
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;

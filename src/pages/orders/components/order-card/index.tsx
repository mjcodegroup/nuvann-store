import React from 'react';
import Image from 'next/image';
import Styles from './order-card.module.scss';
import { Order } from '@/contexts/orders/types';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useNavigation } from '@/hooks/useNavigation';
import CustomButton from '@/components/custom-button';
import { formatDate } from '@/utils/date-convert';
import { useTranslation } from 'react-i18next';

interface OrderCardProps {
    order: Order;
    selectedOrder: Order | null;
    handleOrderClick: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, selectedOrder, handleOrderClick }) => {
    const { redirect } = useNavigation()
    const { t } = useTranslation('order');

    return (
        <div key={order.id}>
            <div
                className={Styles.ActualCard}
            >
                <Image src={order.product.images[0]?.url} alt="product" width={100} height={100} />
                <div className={Styles.CardstitleDate}>
                    <h4>{order.product.name}</h4>
                    <h5>{t('purchase_date')}: <span>{formatDate(order.order_item_status_logs[0]?.occurred_on)}</span></h5>
                    <h5>{t('status')}: <span>{order.status}</span></h5>
                    <h5>{t('quantity')}: <span>{order.quantity}</span></h5>
                    <h5>{t('delivered_by')}: <span>{order.shipping_tracking_data?.company_name}</span></h5>
                </div>
                <div className={Styles.CardsButtons}>
                    <CustomButton
                        backgroundColor='white' textColor='#000052'
                        onClick={() => redirect(`${RoutesUrls.PRODUCT_DETAILS_PAGE}/${order.id}` as RoutesUrls)}>
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

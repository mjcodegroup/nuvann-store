import React, { useState } from 'react';
import Image from 'next/image';
import Styles from './order-card.module.scss';
import { Order, OrderItem } from '@/contexts/orders/types';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useNavigation } from '@/hooks/useNavigation';
import CustomButton from '@/components/custom-button';
import { formatDate } from '@/utils/date-convert';
import { useTranslation } from 'react-i18next';
import { useProductsInfo } from '@/hooks/use-products-info';
import { formatMoney } from '@/utils/formatter/format-money.util';
import ModalConfirm from '@/components/modal-confirm';
import { useOrdersInfo } from '@/hooks/use-orders-info';

interface OrderCardProps {
    order: Order;
    handleOrderClick: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const { redirect } = useNavigation();
    const { t } = useTranslation('order');
    const { handleQuickPurchase, quickPurchaseLoader } = useProductsInfo();
    const [ selectedOrderId, setSelectedOrderId ] = useState('');
    const { openModalReceipt,
        setOpenModalReceipt ,
        confirmReceipt,
        ordersState,
} = useOrdersInfo();

    const allStatuses = ['AWAITING_PAYMENT', 'PAID', 'PROCESSING', 'SHIPPED', 'CANCELLED', 'DELIVERED'];

    const descriptionStatus = [
        t('waiting_for_payment_confirmation'),
        t('payment_received'),
        t('order_being_prepared'),
        t('order_shipped'),
        t('order_cancelled'),
        t('order_delivered'),
    ];

    const onQuickPurchase = async (orderItem: OrderItem) => {
        const propertyArray = [];
        await handleQuickPurchase(orderItem.product.id, {
            quantity: orderItem?.quantity,
            properties: [],
        });
    };
    const statusIndex = allStatuses.indexOf(order.items[0].status);
    const statusDescription = statusIndex !== -1 ? descriptionStatus[statusIndex] : order.items[0].status;

    const handleOpenModalReceipt = (orderId: string) => {
        setOpenModalReceipt(true);
        setSelectedOrderId(orderId);
    }

    return (
        <div className={Styles.card}>
            <div className={Styles.business_section_title}>
                <div className={Styles.businessName}>
                    <h3>{t('oficial_store')}:</h3><small>{order?.business?.name}</small>
                </div>
                <div>
                    <strong>{t('shipping_price')}: {formatMoney(order.selected_shipment?.price ?? 0.00, order.selected_shipment?.currency)}</strong>
                </div>
            </div>
            {order.items.map((item: OrderItem) => (
                <div className={Styles.ActualCard} key={item.id}>
                    <Image
                        src={item.product.images[0]?.url || '/placeholder.png'}
                        alt="product"
                        width={100}
                        height={100}
                    />
                    <div className={Styles.CardstitleDate}>
                        <div className={Styles.title}>
                            <h4>{item.product.name}</h4>
                            <span>ID: {item.public_id}</span>
                        </div>
                        <h5>
                            {t('purchase_date')}: <span>{formatDate(item?.order_item_status_logs?.[0]?.occurred_on, t('date_format'))}</span>
                        </h5>
                        <h5>
                            {t('status')}: <span>{statusDescription}</span>
                        </h5>
                        <h5>
                            {t('quantity')}: <span>{item.quantity}</span>
                        </h5>
                        {item.delivery_code && (
                            <h5>
                                {t('confirmation_code')}: <span>{item.delivery_code}</span>
                            </h5>
                        )}
                        {
                            item.confirmation_date && (
                                <h5>
                                    {t('confirmation_date')}: <span>{formatDate(item.confirmation_date, t('date_format'))}</span>
                                </h5>
                            )
                        }
                    </div>
                    <div className={Styles.CardsButtons}>
                        {
                            !item.confirmation_date && (
                                <CustomButton
                                    backgroundColor="#0c98af"
                                    size='large'
                                    variant='text'
                                    textColor="#ffff"
                                    onClick={() => handleOpenModalReceipt(item.id)}
                                    isLoading={ordersState.confirm_receipt_loader && selectedOrderId === item.id}
                                >
                                    {t('confirm_receipt')}
                                </CustomButton>
                            )
                        }
                        <CustomButton
                            backgroundColor="white"
                            textColor="#000052"
                            onClick={() => onQuickPurchase(item)}
                        >
                            {t('buy_again')}
                        </CustomButton>
                        <CustomButton
                            onClick={() =>
                                redirect(`${RoutesUrls.ORDERS_DETAILS}?orderId=${item.id}` as RoutesUrls)
                            }
                        >
                            {t('see_more')}
                        </CustomButton>
                    </div>
                </div>
            ))}

           <ModalConfirm
                open={openModalReceipt}
                setOpen={setOpenModalReceipt}
                title={t('modal_receive_order_title')}
                description={t('modal_receive_order_description')}
                textBtnCancel={t('btn_cancel')}
                textBtnConfirm={t('btn_confirm')}
                onCLickBtnCancel={() => console.log('cancel')}
                onClickBtnConfirm={() => confirmReceipt(selectedOrderId)}
                loading={ordersState.confirm_receipt_loader}
            />
        </div>
    );
};

export default OrderCard;
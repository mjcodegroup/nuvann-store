import React from 'react';
import Styles from './order-subtile.module.scss';
import { Order } from '@/contexts/orders/types';
import { formatDate } from '@/utils/date-convert';
import { useTranslation } from 'react-i18next';

interface OrderSubCardProps {
    order: Order;
}

const OrderSubCard: React.FC<OrderSubCardProps> = ({ order }) => {
    const { t } = useTranslation('order');

    const allStatuses = ['AWAITING_PAYMENT', 'PAID', 'PROCESSING', 'SHIPPED', 'CANCELLED', 'DELIVERED'];

    const descriptionStatus = [
        t('waiting_for_payment_confirmation'),
        t('payment_received'),
        t('order_being_prepared'),
        t('order_shipped'),
        t('order_cancelled'),
        t('order_delivered'),
    ];

    let showNextStatuses = true;
    const lastKnownStatus = allStatuses.reduce((acc, status) => {
        const statusLog = order.order_item_status_logs?.find(log => log.order_item_status === status);
        return statusLog ? status : acc;
    }, '');

    return (
        <div className={Styles.container}>
            <div className={Styles.rightSection}>
                <div className={Styles.about}>
                    <ul className={Styles.StepProgress}>
                        {allStatuses.map((status, index) => {
                            const statusLog = order.order_item_status_logs?.find(log => log.order_item_status === status);

                            if (status === 'CANCELLED') {
                                if (statusLog) {
                                    showNextStatuses = false;
                                } else {
                                    return null;
                                }
                            }
                            if (!showNextStatuses && status !== 'CANCELLED') {
                                return null;
                            }

                            return (
                                <li
                                    key={status}
                                    className={`${Styles.StepProgressItem} ${
                                        statusLog ? Styles.isActive : Styles.isInactive
                                    } ${status === lastKnownStatus ? Styles.current : ''} ${
                                        status === 'CANCELLED' && lastKnownStatus === 'CANCELLED' ? Styles.isCancelled : ''
                                    }`}
                                >
                                    <strong style={{
                                                color: status === lastKnownStatus ? 'green': ''
                                            }}>{descriptionStatus[index]}</strong>
                                    {statusLog && (
                                        <div>
                                            <span>{formatDate(statusLog.occurred_on)}</span>
                                        </div>
                                    )}
                                    {status === 'CANCELLED' && lastKnownStatus === 'CANCELLED' && (
                                        <span className={Styles.cancelledIcon}></span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrderSubCard;

import React from 'react';
import Styles from './order-subtile.module.scss';
import { Order } from '@/contexts/orders/types';
import { formatDate } from '@/utils/date-convert';

interface OrderSubCardProps {
    order: Order;
}

const OrderSubCard: React.FC<OrderSubCardProps> = ({ order }) => {

    const allStatuses = ['AWAITING_PAYMENT', 'PAID', 'PROCESSING', 'SHIPPED', 'CANCELLED', 'DELIVERED'];
    
    const descriptionStatus = [
        'Waiting for payment confirmation', 
        'Payment has been received', 
        'The order is being prepared and processed', 
        'The order has been shipped',
        'The order was cancelled', 
        'The order has been delivered'
    ];

    let showNextStatuses = true;

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
                                        statusLog ? Styles.isDone : ''
                                    }`}
                                >
                                    <strong>{descriptionStatus[index]}</strong>
                                    {statusLog && (
                                        <div>
                                            <span>{formatDate(statusLog.occurred_on)}</span>
                                        </div>
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

import React from 'react';
import Styles from './order-subtile.module.scss';
import { Order } from '@/contexts/orders/types';

interface OrderSubCardProps {
    order: Order;
}

const OrderSubCard: React.FC<OrderSubCardProps> = ({ order }) => {
    return (
        <div className={Styles.container}>
            <div className={Styles.rightSection}>
                <div className={Styles.about}>
                    <ul className={Styles.StepProgress}>
                        {order.order_item_status_logs?.map((log, index) => (
                            <li
                                key={log.id}
                                className={`${Styles.StepProgressItem} ${
                                    index < order.order_item_status_logs.length - 1
                                        ? Styles.isDone
                                        : Styles.current
                                }`}
                                >
                                <strong>{log.order_item_status}</strong>
                                <div>
                                    <span>Action: {log.description}</span>
                                </div>
                                <div>
                                    <span>Occurred on: {log.occurred_on}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrderSubCard;







// CREATED,
// CONFIRMED,
// CANCELED,
// REFUNDED,
// FAILED
import React from 'react';
import Styles from './order-subtile.module.scss';
import { Order } from '@/contexts/orders/types';

interface OrderSubCardProps {
    order: Order;
}

const OrderSubCard: React.FC<OrderSubCardProps> = ({ order }) => {
    return (
        <div className={Styles.ExpandedCard}>
            <h5>Real time track:</h5>
            {order.order_item_status_logs.map(log => (
                <div key={log.id} className={Styles.LogItem}>
                    <strong>Status:</strong> {log.order_item_status} <br />
                    <strong>Action:</strong> {log.description} <br />
                    <strong>Date:</strong> <span>{log.occurred_on}</span>
                </div>
            ))}
        </div>
    );
}

export default OrderSubCard;

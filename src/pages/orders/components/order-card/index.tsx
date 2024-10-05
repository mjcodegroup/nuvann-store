import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Styles from './order-card.module.scss';
import { Order } from '@/contexts/orders/types';
import { RoutesUrls } from '@/utils/enums/routesUrl';

interface OrderCardProps {
    order: Order;
    selectedOrder: Order | null;
    handleOrderClick: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, selectedOrder, handleOrderClick }) => {
    return (
        <div key={order.id}>
            <div
                className={`${Styles.ActualCard} ${order.id === selectedOrder?.id ? Styles.selected : ''}`}
                onClick={() => handleOrderClick(order)}
            >
                <Image src={order.product.images[0]?.url} alt="product" width={100} height={100} />
                <div className={Styles.CardstitleDate}>
                    <h4>{order.product.name}</h4>
                    <h5>Dat acha: <span>{order.order_item_status_logs[0]?.occurred_on}</span></h5>
                    <h5>Estati: <span>{order.status}</span></h5>
                    <h5>Kantite: <span>{order.quantity}</span></h5>
                    <h5>Delivred by: <span>{order.shipping_tracking_data?.company_name}</span></h5>
                </div>
                <div className={Styles.CardsButtons}>
                    <Link
                        href={{
                            pathname: RoutesUrls.ORDERS_DETAILS,
                            query: { order: JSON.stringify(order) },
                        }}
                        passHref
                    >
                        <button onClick={(e) => {
                            e.stopPropagation();
                        }}>
                            Wè plis
                        </button>
                    </Link>

                    <button className={Styles.Achtebtn}>Achte ankò</button>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;

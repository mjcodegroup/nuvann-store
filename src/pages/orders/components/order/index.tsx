import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { HomePageDefault } from '@/components/home-page-default';
import { useOrdersInfo } from '@/hooks/use-orders-info';

export default function Orders() {
    const { orders, getOrders } = useOrdersInfo();

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <HomePageDefault>
            {orders.length === 0 ? (
                <div className={styles.AchasHolder2}>
                    <div className={styles.messageAnyen}>
                        <h3>Ou poko achte anyen !!</h3>
                        <Link href="/#">
                            <button className={styles.plispwodui}>Plis pwodui</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={styles.AchasHolder}>
                    <div className={styles.PurchaseCards}>
                        <h3>Pwodwi ou achte deja</h3>
                        <div className={styles.PurchaseScroll}>
                            {orders.map((order: any) => (
                                <div className={styles.ActualCard} key={order.id}>
                                    <img src="" alt="product" />

                                    <div className={styles.CardstitleDate}>
                                        <h4>{order.status}</h4>
                                        <h5>Dat: <span>{order.date}</span></h5>
                                        <h5>Estati: <span>{order.status}</span></h5>
                                    </div>

                                    <div className={styles.CardsButtons}>
                                        <button onClick={() => {}}>Wè plis</button> <br />
                                        <button className={styles.Achtebtn}>Achte ankò</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </HomePageDefault>
    );
}

import React from 'react';
import styles from './style.module.scss';
import CustomButton from '@/components/custom-button';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useNavigation } from '@/hooks/useNavigation';

interface OrdersProps {
    orders: any[];
    isLoading: boolean;
}

export default function Orders({ orders, isLoading }: OrdersProps) {
    const { redirect } = useNavigation();

    return (
        <>
            {orders.length === 0 ? (
                <div className={styles.AchasHolder2}>
                    <div className={styles.messageAnyen}>
                        <h3>Ou poko achte anyen !!</h3>
                        <CustomButton
                            variant="outlined"
                            onClick={() => redirect(RoutesUrls.HOME)}
                            backgroundColor="#000052"
                            textColor="#ffff"
                            width={200}
                            height={35}
                        >
                            Achte
                        </CustomButton>
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
        </>
    );
}

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HomePageDefault } from '@/components/home-page-default';
import OrderDetails from '../view';

export default function OrdersController() {
    const router = useRouter();
    const { order } = router.query;
    const [parsedOrder, setParsedOrder] = useState(null);

    console.log(order)

    useEffect(() => {
        if (order) {
            setParsedOrder(JSON.parse(order as string));
        }
    }, [order]);
    return (
        <HomePageDefault>
            {parsedOrder ? (
                <OrderDetails order={parsedOrder} isLoading={false} />
            ) : (
                <div>Loading order details...</div>
            )}
        </HomePageDefault>
    );
}

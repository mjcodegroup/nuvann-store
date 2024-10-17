import React from 'react';
import styles from './order-resume.module.scss';
import CustomButton from '@/components/custom-button';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import { Order } from '@/contexts/orders/types';
import Title from '../title';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useNavigation } from '@/hooks/useNavigation';

export interface OrderResumeData {
  count: number;
  sub_total: number;
  shipping_cost: number;
  total: number;
}

export interface OrderResumeProps {
  data: OrderResumeData;
  order: Order;
  OnCheckout: () => void;
  loading: boolean;
  disabled?: boolean;
}

const OrdersResume: React.FC<OrderResumeProps> = (props: OrderResumeProps) => {
  const { t } = useTranslation('cart');
  const { data, order } = props;
  const { redirect } = useNavigation()

  return (
    <div className={styles.card_resume}>
      <Title title={t('summary')} className={styles.resume_title} />

      <div className={styles.content}>
        <div className={styles.resume_separated_info}>
          <p>Pri total </p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5>{data.sub_total}</h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
          <p>{t('delivery')}</p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5>{data.shipping_cost}</h5>
          )}
        </div>
        <div className={styles.resume_separated_info}>
        <Title title='Seller Information' className={styles.resume_title} />

        <h4></h4>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5></h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
        <p>
            Name:{' '}
            <span
              className={styles.seller_name}
              onClick={() => redirect(`${RoutesUrls.SELLER_DETAILS}?orderId=${order.id}` as RoutesUrls)}

              style={{ cursor: 'pointer', color: '#007BFF', textDecoration: 'underline' }}
            >
              {order?.seller?.name}
            </span>
          </p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5></h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
        <p>Country: {order?.seller?.country?.name}</p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5></h5>
          )}
        </div>
        
        <div className={styles.resume_separated_info}>
        {order?.shipping_tracking_data && (
          <>
            <h4>Shipping Tracking</h4>
            <p>Company: {order?.shipping_tracking_data.company_name}</p>
            <p>Tracking ID: {order?.shipping_tracking_data.tracking_id}</p>
          </>
        )}          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5></h5>
          )}
        </div>
      </div>

      <div className={styles.resume_buttons}>
        <CustomButton
          disabled={props.loading || props.disabled}
          backgroundColor="#00C02A"
          textColor="#fff"
          onClick={() => redirect(`${RoutesUrls.PRODUCT_DETAILS_PAGE}/${order.id}` as RoutesUrls)}>
            Achte ankò
        </CustomButton>
      </div>
    </div>
  );
};

export default OrdersResume;

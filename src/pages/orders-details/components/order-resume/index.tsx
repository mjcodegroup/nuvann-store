import React from 'react';
import Link from 'next/link';
import styles from './order-resume.module.scss';
import CustomButton from '@/components/custom-button';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import { Order } from '@/contexts/orders/types';
import Title from '../title';

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

  return (
    <div className={styles.card_resume}>
      <Title title={t('cart.summary')} className={styles.resume_title} />

      <div className={styles.content}>
        <div className={styles.resume_separated_info}>
          <p>Pri total: ({data.count})</p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5>{data.sub_total}</h5>
          )}
        </div>
        <hr />

        <div className={styles.resume_separated_info}>
          <p>{t('cart.delivery')}</p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5>{data.shipping_cost}</h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
        <h4>Seller Information</h4>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5></h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
        <p>Name: {order?.seller?.name}</p>
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
        <hr />
        <div className={styles.resume_separated_info}>
        <h4>Shipping Address</h4>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5></h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
        <p>
          Street: {order?.shipping_address?.street}, {order?.shipping_address?.number}
        </p>
        {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5></h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
        <p>City: {order?.shipping_address?.city}</p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5></h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
        <p>State: {order?.shipping_address?.state_or_department}</p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5></h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
        <p>Country: {order?.shipping_address?.country.name}</p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5></h5>
          )}
        </div>
        <hr />
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
          onClick={props.OnCheckout}
        >
          <Link href="#">Achte ankò</Link>
        </CustomButton>
      </div>
    </div>
  );
};

export default OrdersResume;

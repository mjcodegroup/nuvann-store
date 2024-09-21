import React from 'react';
import Link from 'next/link';
import styles from './order-resume.module.scss';
import Title from '../title';
import CustomButton from '@/components/custom-button';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';

export interface OrderResumeData {
  count: number;
  sub_total: number;
  shipping_cost: number;
  total: number;
}
export interface OrderResumeProps {
    data: OrderResumeData;
    OnCheckout: () => void;
    loading: boolean;
}

const OrderResume: React.FC<OrderResumeProps> = (props: OrderResumeProps) => {
  const {t} = useTranslation('cart');
  const { data } = props;
  return (
    <div className={styles.card_resume}>
      <Title title={t('cart.summary')} className={styles.resume_title} />

      <div className={styles.content}>
        <div className={styles.resume_separated_info}>
          <p>{t('cart.product')} ({data.count})</p>
          {props.loading ? (
            <p><Skeleton typeof='..........' width={100} height={30}/> </p>
            ) :
            (
              <h5>{data.sub_total}</h5>
            )}
        </div>
        <hr />

        <div className={styles.resume_separated_info}>
          <p>{t('cart.delivery')}</p>
          {props.loading ? (
            <p><Skeleton typeof='..........' width={100} height={30}/> </p>
            ) :
            (
              <h5>{data.shipping_cost}</h5>
            )
          }
        </div>
        <hr />

        <div className={styles.resume_separated_info}>
          <p>{t("cart.total")} </p>
          {props.loading ? (
            <p><Skeleton typeof='..........' width={100} height={30}/> </p>
            ) :
            (
              <h5>{data.total}</h5>
            )
          }
        </div>
        <hr />
      </div>

      <div className={styles.resume_buttons}>
        <CustomButton disabled={props.loading} backgroundColor ='#00C02A' textColor="#fff" onClick={props.OnCheckout}>
          <Link href="#">{t('cart.checkout')}</Link>
        </CustomButton>
        {/* <CustomButton backgroundColor ='#001A5C' textColor="#fff" onClick={() => alert('Button clicked!')}>
            Kontinye Achte
        </CustomButton> */}
      </div>
    </div>
  );
}

export default OrderResume;

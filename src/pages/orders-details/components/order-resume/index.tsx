import React from 'react';
import styles from './order-resume.module.scss';
import CustomButton from '@/components/custom-button';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import { OrderItem } from '@/contexts/orders/types';
import Title from '../title';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useNavigation } from '@/hooks/useNavigation';
import { useProductsInfo } from '@/hooks/use-products-info';
import { formatMoney } from '@/utils/formatter/format-money.util';

export interface OrderResumeData {
  count: number;
  sub_total: number;
  shipping_cost: number;
  total: number;
}

export interface OrderResumeProps {
  data: OrderResumeData;
  order: OrderItem;
  onCheckout: () => void;
  loading: boolean;
  disabled?: boolean;
}

const OrdersResume: React.FC<OrderResumeProps> = (props: OrderResumeProps) => {
  const { t } = useTranslation('order');
  const { data, order, onCheckout, loading, disabled } = props;
  const { redirect } = useNavigation();
  const { handleQuickPurchase, quickPurchaseLoader } = useProductsInfo();


  return (
    <div className={styles.card_resume}>
      <Title title={t('overview')} className={styles.resume_title} />

      <div className={styles.content}>
        <div className={styles.resume_separated_info}>
          <p>{t('sub_total')}:</p>
          {loading ? (
            <Skeleton width={100} height={30} />
          ) : (
            <h5>{formatMoney(data.sub_total, order.currency)}</h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
          <p>{t('delivery')}:</p>
          {loading ? (
            <Skeleton width={100} height={30} />
          ) : (
            <h5>{formatMoney(data.shipping_cost, order.currency)}</h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
          <p>{t('total_price')}:</p>
          {loading ? (
            <Skeleton width={100} height={30} />
          ) : (
            <h5>{formatMoney(data.total, order.currency)}</h5>
          )}
        </div>
        <div className={styles.resume_separated_info}>
          <Title title={t('seller_information')} className={styles.resume_title} />
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
            {t('name')}:{' '}
            <span
              className={styles.seller_name}
              onClick={() => redirect(`${RoutesUrls.SELLER_DETAILS}?orderId=${order?.seller?.business_account_id}&name=${encodeURIComponent(order?.seller?.name)}&country=${encodeURIComponent(order.seller.country.name)}&createdAt=${encodeURIComponent(order.seller.created_at)}` as RoutesUrls)}

            >
              {order?.seller?.name}
            </span>
          </p>
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
          <p>{t('country')}:</p>
          {loading ? (
            <Skeleton width={100} height={30} />
          ) : (
            <h5>{order?.seller?.country?.name}</h5>
          )}
        </div>
        {order?.shipping_tracking_data && (
          <>
            <Title title={t('shipping_title')} className={styles.resume_title} />
            <hr />
            <div className={styles.resume_separated_info}>
              <p>{t('company')}:</p>
              {loading ? (
                <Skeleton width={100} height={30} />
              ) : (
                <h5>{order.shipping_tracking_data?.company_name || '-'}</h5>
              )}
            </div>
            <hr />
            <div className={styles.resume_separated_info}>
              <p>{t('tracking_id')}:</p>
              {loading ? (
                <Skeleton width={100} height={30} />
              ) : (
                <h5>{order.shipping_tracking_data?.tracking_id || '-'}</h5>
              )}
            </div>
          </>
        )}
      </div>
      <div className={styles.resume_buttons}>
        <CustomButton
          disabled={loading || disabled}
          backgroundColor="#00C02A"
          textColor="#fff"
          onClick={onCheckout}
        >
          {t('buy_again')}
        </CustomButton>
      </div>
    </div>
  );
};

export default OrdersResume;

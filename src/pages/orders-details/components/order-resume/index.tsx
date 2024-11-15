import React from 'react';
import styles from './order-resume.module.scss';
import CustomButton from '@/components/custom-button';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import { Order } from '@/contexts/orders/types';
import Title from '../title';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useNavigation } from '@/hooks/useNavigation';
import { useProductsInfo } from '@/hooks/use-products-info';

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
  const { t } = useTranslation('order');
  const { data, order } = props;
  const { redirect } = useNavigation();
  const {
    handleQuickPurchase,
    quickPurchaseLoader
  } = useProductsInfo();

  const onQuickPurchase = async () => {
    const colorValue = order?.properties?.additionalProp1?.[0]?.value;
    const sizeValue = order?.properties?.additionalProp2?.[0]?.value;
    const propertyArray = [];
    if (colorValue) {
      propertyArray.push({ color: colorValue });
    }
    if (sizeValue) {
      propertyArray.push({ size: sizeValue });
    }
    handleQuickPurchase(order.product.id, {
      quantity: order?.quantity,
      properties: propertyArray ?? undefined
    })
  }


  return (
    <div className={styles.card_resume}>
      <Title title={t('overview')} className={styles.resume_title} />

      <div className={styles.content}>
        <div className={styles.resume_separated_info}>
          <p>{t('sub_total')}: </p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5>{data.sub_total} {order.currency}</h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
          <p>{t('delivery')}: </p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5>{data.shipping_cost} {order.currency}</h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
          <p>{t('total_price')}:  </p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5>{data.total} {order.currency}</h5>
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
              onClick={() => redirect(`${RoutesUrls.SELLER_DETAILS}?orderId=${order.seller.business_account_id}&name=${encodeURIComponent(order.seller.name)}&country=${encodeURIComponent(order.seller.country.name)}&createdAt=${encodeURIComponent(order.seller.created_at)}` as RoutesUrls)}
            >
            </span>
          </p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5>{order?.seller?.name}</h5>
          )}
        </div>
        <hr />
        <div className={styles.resume_separated_info}>
          <p>{t('country')}: </p>
          {props.loading ? (
            <p><Skeleton width={100} height={30} /> </p>
          ) : (
            <h5>{order?.seller?.country?.name}</h5>
          )}
        </div>
        {order?.shipping_tracking_data && (
          <>
            <div>
              <Title title={t('shipping_title')} className={styles.resume_title} />
              <h4></h4>
              {props.loading ? (
                <p><Skeleton width={100} height={30} /></p>
              ) : (
                <h5></h5>
              )}
            </div>
            <hr />
            <div className={styles.resume_separated_info}>
              <p>{t('company')}: </p>
              {props.loading ? (
                <p><Skeleton width={100} height={30} /></p>
              ) : (
                <h5>{order.shipping_tracking_data.company_name}</h5>
              )}
            </div>
            <hr />
            <div className={styles.resume_separated_info}>
              <p>{t('tracking_id')}: </p>
              {props.loading ? (
                <p><Skeleton width={100} height={30} /></p>
              ) : (
                <h5>{order.shipping_tracking_data.tracking_id}</h5>
              )}
            </div>
          </>
        )}
      </div>
      <div className={styles.resume_buttons}>
        <CustomButton
          disabled={props.loading || props.disabled}
          backgroundColor="#00C02A"
          textColor="#fff"
          onClick={onQuickPurchase}>
          {t('buy_again')}
        </CustomButton>
      </div>
    </div>
  );
};

export default OrdersResume;

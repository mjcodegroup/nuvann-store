import React from 'react';
import Styles from "./card-products.module.scss"
import { useTranslation } from 'react-i18next';
import { CardProductsProps } from '../../types';
import Image from 'next/image';
import { BusinessItems, CheckoutItem } from '@/contexts/checkout/types';
import { truncateStringWithEllipsis } from '@/utils/truncate-string-with-ellipsis';
import CustomButton from '@/components/custom-button';
import { getDefaultShipment } from '@/utils/get-default-shipment';
import { formatUnderscoreToSpacesUpperCase } from '@/utils/formatter/format-underscore-to-spaces-upper-case';
import { formatMoney } from '@/utils/formatter/format-money.util';
import FreeShippingText from '@/components/free-shipping-text';
import { formatPrice } from '@/utils/formatter/format-price.util';

export default function CardProducts(props: CardProductsProps) {
  const { t } = useTranslation("checkout");

  return (
    <div className={Styles.products_wrapper}>
        <h4>{t("title_products_ordered")}</h4> <br />
        {
          props.business_items?.map((business: BusinessItems, index: any) => (
              <div className={Styles.products_row} key={business.business.id}>
                <div>
                  {
                    business.items?.map((item: any, index:number) => (
                      <div className={Styles.row} key={index}>
                          <div className={Styles._image}>
                            <Image src={item.product.images[0]?.url || ''} alt={item.product.images[0].alt|| ''} width={50} height={50} />
                            {truncateStringWithEllipsis(item.product.name, 28)}
                          </div>
                          <div className={Styles.row_content}>
                            <p>{t('price')}</p>
                            <span>{formatMoney(item?.unit_price_with_discount, item.currency)}</span>
                          </div>
                          <div className={Styles.row_content}>
                            <p>{t('amount')}</p>
                            <span>{item.quantity}</span>
                          </div>
                          <div className={Styles.row_content}>
                            <p>{t('_subtotal')}</p>

                            <span>{formatMoney(Number(item.subtotal), item.currency)}</span>
                          </div>
                      </div>
                    ))
                  }
                </div>

                  <div className={Styles.separator}></div>
                <div className={Styles._row_footer}>
                  <div>
                    <h5>{t('shipping_options')}:</h5>
                  </div>
                  <div>
                    <h5>{formatUnderscoreToSpacesUpperCase(getDefaultShipment(business?.available_shipments)?.type as string)}</h5>
                    <span>{getDefaultShipment(business?.available_shipments)?.delivery_deadline || t('shipment_not_available_text')}</span>
                  </div>
                  {
                   getDefaultShipment(business?.available_shipments)?.delivery_deadline && (
                    <>
                      <div>
                        <CustomButton
                          variant='text'
                          onClick={()=>props.onClickBtnChangeShipment(business)}
                        >
                          {t('btn_to_replace_address')}
                        </CustomButton>
                      </div>
                      
                      <div>
                        <h5><FreeShippingText text={formatPrice(getDefaultShipment(business?.available_shipments)?.price ?? 0, props.currency)}/> </h5>
                      </div>
                    </>
                    )
                  }
                </div>
              </div>
          ))}
    </div>
  )
}

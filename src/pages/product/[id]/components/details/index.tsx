import React from 'react'
import Styles from './details.module.scss';
import ColorComponent from '../color-component';
import SizeComponent from '../size-component';
import ShipmentInfos from '../shipment-infos';
import AvailableCountries from '../available-countries';
import InputQuantity from '@/components/input-quantity';
import CustomButton from '@/components/custom-button';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { DetailsProps } from '../../types';

export default function Details(props: DetailsProps) {
  const { t } = useTranslation('details');
  const {
    productInfos, 
    onError,
    onSelectedShippingInfo,
    selectedShippingInfo,
    onSelectedSize,
    selectedSize,
    onSelectedColor,
    selectedColor,
    onChangeQuantity,
    qty,
    onIncrement,
    onDecrement,
    onAddToCart,
    isLoading,
    onPurchase
  } = props;

  return (
    <div className={Styles.product_infos}>
        <section>
            <h3>{props.productInfos?.name}</h3>
            <div className={Styles.title_footer}>
                <p><span>{t('details.seller')}:</span> <small>{productInfos?.seller?.name}</small>  </p>
                <p><span>{t('details.country')}:</span> <small>{productInfos?.seller?.country?.name}</small></p>
                <p><span>{t('details.sales')}:</span> <small>{productInfos?.sold_amount} unite</small></p>
            </div>

            <div className={Styles.prices_class}>
                <p>
                <small>{productInfos?.prices?.original_price?.formatted}</small>
                {productInfos?.prices?.current_price?.formatted}
                {
                  productInfos?.prices?.current?.discountPercent && 
                  <span>-{productInfos?.prices?.current?.discountPercent} %</span>
                }
                </p>
            </div>
        </section>

        <section className={Styles.selected_section} style={{backgroundColor: onError ? '#fff5f5' : '', marginTop:'8px', paddingLeft: '8px'}}>
            <div className={`colores_container ${onError && !selectedColor.value ? Styles.shake : ''}` }>
                <ColorComponent colors={productInfos?.properties?.color}  selectedColor={selectedColor?.value} onSelectColor={onSelectedColor} />
            </div>
            <div className={`sizes_container  ${onError && !selectedSize.value ? Styles.shake : ''}`}>
                <SizeComponent sizes={productInfos?.properties?.size} selectedSize={selectedSize?.value} onSelectSize={onSelectedSize} />
            </div>

            <div className={`shipment_infos  ${onError && !selectedShippingInfo.id ? Styles.shake : ''}`}>
                <ShipmentInfos shippingInfos={productInfos?.shipments} onInfoSelect={onSelectedShippingInfo} />
            </div>
            {
            onError ? 
                <small className="detail_error_message">{t("details.please_select_size_or_color")}</small>
            : ''
            }
        </section>
        <section>
            <div className={Styles.avalaible_countries}>
                <AvailableCountries countries={productInfos?.available_countries} />
            </div>
        </section>

        <InputQuantity
            total={productInfos?.available_amount}
            availableText={t('details.available')}
            label={t('details.quantity')}
            onChange={onChangeQuantity} 
            value={qty}
            increment={onIncrement}
            decrement={onDecrement}
        />

        <section className={Styles.detail_infos_footer}>
            <CustomButton
              isLoading={isLoading}
              startIcon={<AiOutlineShoppingCart/>}
              textColor='#000052'
              className={Styles.btn_cart}
              variant='outlined'
              onClick={onAddToCart}
              >
                {t('details.add_to_cart')}
            </CustomButton>
            <CustomButton
                className={Styles.btn_purchase}
                backgroundColor="#00B127"
                textColor='#fff'
                onClick={onPurchase}
            >
                    {t('details.buy_now')}
            </CustomButton>
        </section>

    </div>
  )
}

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
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useNavigation } from '@/hooks/useNavigation';

export default function Details(props: DetailsProps) {
  const { t } = useTranslation('details');
  const { redirect } = useNavigation()

  const {
    productInfos, 
    onError,
    onSelectedShippingInfo,
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

  const redirectToSellerDetails = () => {
    redirect(`${RoutesUrls.SELLER_DETAILS}?orderId=${props.productInfos.id}&name=${encodeURIComponent(props.productInfos.seller.name)}&country=${encodeURIComponent(props.productInfos.seller.country.name)}&createdAt=${encodeURIComponent(props.productInfos.seller.created_at)}` as RoutesUrls)
  };

  return (
    <div className={Styles.product_infos}>
      <div>
      <section>
            <h3>{props.productInfos?.name}</h3>
            <div className={Styles.title_footer}>
                <p>
                  <span>{t('seller')}: </span>
                  <span
                  className={Styles.seller_name}
                    onClick={redirectToSellerDetails}
                  >
                    {productInfos?.seller?.name}
                  </span>
                </p>
                <p><span>{t('country')}:</span> <small>{productInfos?.seller?.country?.name}</small></p>
                <p><span>{t('sales')}:</span> <small>{productInfos?.sold_amount} unite</small></p>
            </div>

            <div className={Styles.prices_class}>
                <small>{productInfos?.prices?.original_price?.formatted}</small>
                <p>{productInfos?.prices?.current_price?.formatted}</p>
                {
                  productInfos?.prices?.current?.discountPercent && 
                  <span>-{productInfos?.prices?.current?.discountPercent} %</span>
                }
            </div>
        </section>

        <section className={Styles.selected_section} style={{backgroundColor: onError ? '#fff5f5' : '', marginTop:'8px', paddingLeft: '8px'}}>
            <div className={`colores_container ${onError && !selectedColor.value ? Styles.shake : ''}` }>
                <ColorComponent colors={productInfos?.properties?.color}  selectedColor={selectedColor?.value} onSelectColor={onSelectedColor} />
            </div>
            <div className={`sizes_container  ${onError && !selectedSize.value ? Styles.shake : ''}`}>
                <SizeComponent sizes={productInfos?.properties?.size} selectedSize={selectedSize?.value} onSelectSize={onSelectedSize} />
            </div>

            {
              onError ? 
              <small className="detail_error_message">{t("please_select_size_or_color")}</small>
              : ''
            }
        </section>
            {
              productInfos?.shipments?.length ?
            <div className={Styles.shipment_infos}>
                <ShipmentInfos no_default_selected shippingInfos={productInfos?.shipments} onInfoSelect={onSelectedShippingInfo} />
            </div> : ''
            }
        <section>
            <div className={Styles.avalaible_countries}>
                <AvailableCountries countries={productInfos?.available_countries} />
            </div>
        </section>

        <InputQuantity
            total={productInfos?.available_amount}
            availableText={t('available')}
            label={t('quantity')}
            onChange={onChangeQuantity} 
            value={qty}
            increment={onIncrement}
            decrement={onDecrement}
        />
      </div>

        <section className={Styles.detail_infos_footer}>
            <CustomButton
              isLoading={isLoading}
              startIcon={<AiOutlineShoppingCart/>}
              textColor='#000052'
              className={Styles.btn_cart}
              variant='outlined'
              onClick={onAddToCart}
              >
                {t('add_to_cart')}
            </CustomButton>
            <CustomButton
                isLoading={props.onPurchaseLoading}
                className={Styles.btn_purchase}
                backgroundColor="#00B127"
                textColor='#fff'
                onClick={onPurchase}
            >
                    {t('buy_now')}
            </CustomButton>
        </section>

    </div>
  )
}

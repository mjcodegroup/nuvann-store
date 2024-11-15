import React, { FC, useEffect, useState } from 'react';
import Styles from './shipment-infos.module.scss';
import { useTranslation } from 'react-i18next';
import CustomButton from '@/components/custom-button';

interface ShippingInfo {
  id: string;
  delivery_deadline: string;
  price: number;
  default_shipment: boolean;
  coverage_area: string;
  currency: string;
}

interface ShippingProps {
  shippingInfos: ShippingInfo[];
  onInfoSelect: (info: ShippingInfo) => void;
  no_default_selected?: boolean;
}

const ShipmentInfos: FC<ShippingProps> = ({ shippingInfos, onInfoSelect, no_default_selected = false }) => {
  const { t } = useTranslation('details');
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false); // Controla se está mostrando todos os itens

  useEffect(() => {
    const defaultInfo = shippingInfos?.find((info) => info.default_shipment);
    if (defaultInfo && !selectedId && !no_default_selected) { 
      setSelectedId(defaultInfo.id);
      onInfoSelect(defaultInfo);
    }
  }, [shippingInfos, onInfoSelect, selectedId, no_default_selected]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setSelectedId(id);

    const selectedInfo = shippingInfos.find((info) => info.id === id);
    if (selectedInfo) {
      onInfoSelect(selectedInfo);
    }
  };

  const handleToggle = () => {
    setShowAll((prev) => !prev); // Alterna entre ver mais ou ver menos
  };

  return (
    <div className={Styles.shipping}>
      <h4>{t('delivery_information')}</h4>
      <div className={Styles.shipping_list}>
        {shippingInfos
          ?.slice(0, showAll ? shippingInfos.length : 2) // Mostra 3 ou todos
          .map((info, index) => (
            <div key={info.id + index} className={Styles.shipping_info}>
              <label htmlFor={`shipping-${info.id}`}>
                {
                  !no_default_selected && (
                <input
                  disabled={no_default_selected}
                  type="radio"
                  id={`shipping-${info.id}`}
                  name="shipping"
                  value={info.id}
                  checked={selectedId === info.id}
                  onChange={handleRadioChange}
                />
                  )
                }
                <div className={Styles.info_details}>
                  <div className={Styles.delivery}>{info?.delivery_deadline}</div>
                  <div className={Styles.price}> {`${info.currency} ${info?.price}`}</div>
                </div>
              </label>
              <div className={Styles.coverage_footer}>
                <span>{info?.coverage_area}</span>
              </div>
            </div>
        ))}
      </div>
      {shippingInfos.length > 2 && (
        <CustomButton onClick={handleToggle} className={Styles.see_more} variant='text'>
          {showAll ? t('see_less') : t('see_more')}
        </CustomButton>
      )}
    </div>
  );
};

export default ShipmentInfos;

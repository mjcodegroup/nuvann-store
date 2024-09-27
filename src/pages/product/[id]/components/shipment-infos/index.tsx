import React, { FC, useEffect, useState } from 'react';
import Styles from './shipment-infos.module.scss';
import { useTranslation } from 'react-i18next';

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
}

const ShipmentInfos: FC<ShippingProps> = ({ shippingInfos, onInfoSelect }) => {
  const { t } = useTranslation('details');
  
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const defaultInfo = shippingInfos?.find((info) => info.default_shipment);
    if (defaultInfo && !selectedId) {
      setSelectedId(defaultInfo.id);
      onInfoSelect(defaultInfo);
    }
  }, [shippingInfos, onInfoSelect, selectedId]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setSelectedId(id);

    const selectedInfo = shippingInfos.find((info) => info.id === id);
    if (selectedInfo) {
      onInfoSelect(selectedInfo);
    }
  };

  return (
    <div className={Styles.shipping}>
      <h4>{t('details.delivery_information')}</h4>
      <div className={Styles.shipping_list}>
        {shippingInfos?.map((info, index) => (
          <div key={info.id + index} className={Styles.shipping_info}>
            <label htmlFor={`shipping-${info.id}`}>
              <input
                type="radio"
                id={`shipping-${info.id}`}
                name="shipping"
                value={info.id}
                checked={selectedId === info.id}
                onChange={handleRadioChange}
              />
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
    </div>
  );
};

export default ShipmentInfos;

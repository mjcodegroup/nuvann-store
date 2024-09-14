import React, { FC, useState } from 'react';
import Styles from './shipment-infos.module.scss';
import { useTranslation } from 'react-i18next';
interface ShippingInfo {
  id: number;
  delivery_deadline: string;
  price: any;
}

interface ShippingProps {
  shippingInfos: ShippingInfo[];
  onInfoSelect: (info: ShippingInfo) => void;
}

const ShipmentInfos: FC<ShippingProps> = ({ shippingInfos, onInfoSelect }) => {
  const { t } = useTranslation('details');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(event.target.value);
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
          <div key={info.id+index} className={Styles.shipping_info}>
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
                <div className={Styles.price}>{t('details.price')}: {info?.price}</div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentInfos;
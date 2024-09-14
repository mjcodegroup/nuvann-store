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
  
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const defaultInfo = shippingInfos?.find((info) => info.default_shipment);
    return defaultInfo ? defaultInfo.id : null;
  });

  useEffect(() => {
    // Define o valor de envio padrão ao carregar as informações
    if (selectedId) {
      const selectedInfo = shippingInfos.find((info) => info.id === selectedId);
      if (selectedInfo) {
        onInfoSelect(selectedInfo);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingInfos]);

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

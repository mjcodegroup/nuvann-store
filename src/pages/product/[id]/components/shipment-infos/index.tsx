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
    // Define o valor de envio padrão ao carregar as informações
    const defaultInfo = shippingInfos.find((info) => info.default_shipment);
    if (defaultInfo && !selectedId) {
      setSelectedId(defaultInfo.id);
      onInfoSelect(defaultInfo); // Notifica o pai sobre a seleção padrão
    }
  }, [shippingInfos, onInfoSelect, selectedId]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setSelectedId(id); // Atualiza o estado com o ID selecionado

    const selectedInfo = shippingInfos.find((info) => info.id === id);
    if (selectedInfo) {
      onInfoSelect(selectedInfo); // Notifica o pai sobre a seleção
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
                checked={selectedId === info.id} // Verifica se o ID selecionado é o atual
                onChange={handleRadioChange} // Atualiza o valor selecionado
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

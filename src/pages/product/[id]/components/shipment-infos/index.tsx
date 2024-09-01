import React, { FC, useState } from 'react';
import Styles from './shipment-infos.module.scss';
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
      <h4>Enfòmasyon sou livrezon</h4>
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
                <div className="delivery">{info?.delivery_deadline}</div>
                <div className="price">Price: {info?.price}</div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentInfos;
import React from 'react'
import Styles from './details.module.scss';
import ColorComponent from '../color-component';
import SizeComponent from '../size-component';
import ShipmentInfos from '../shipment-infos';
import AvailableCountries from '../available-countries';


interface DetailsProps {
    productInfos: any;
}
export default function Details(props: DetailsProps) {
    const [selectedShippingInfo, setSelectedShippingInfo] = React.useState({id:0});

    const [selectedSize, setSelectedSize] = React.useState({
        key:"",
        value : ""
    });
    const [selectedColor, setSelectedColor] = React.useState({
    key: "",
    value: ""
    });
    const handleSelectShippingInfo = (selectedShippingInfo: any) => {
    setSelectedShippingInfo(selectedShippingInfo);
    sethandleError(false)
    };

      
    const [handleError, sethandleError] = React.useState<boolean>(false)
    const {productInfos} = props;

    const handleSelectSize = (size: any) => {
        setSelectedSize({
          key: "size",
          value: (size).toString()
        });
        sethandleError(false)
      };
    
      const handleSelectColor = (color:any) => {
        setSelectedColor({
          key: "color",
          value:color
        });
        sethandleError(false)
      };

  return (
    <div className={Styles.product_infos}>
        <section>
            <h3>{productInfos?.name}</h3>
            <div className={Styles.title_footer}>
                <p><span>Vandè:</span> <small>{productInfos?.seller?.name}</small>  </p>
                <p><span>Pays:</span> <small>{productInfos?.seller?.country?.name}</small></p>
                <p>Vant: <small>{productInfos?.sold_amount} unite</small></p>
            </div>

            <div className={Styles.prices_class}>
                <p>
                <small>{productInfos?.prices?.before?.formatted}</small>
                {productInfos?.prices?.current?.formatted}
                {
                    productInfos?.prices?.current?.discountPercent && 
                    <span>-{productInfos?.prices?.current?.discountPercent} %</span>
                }
                </p>
            </div>
        </section>

        <section className={Styles.selected_section} style={{backgroundColor: handleError ? '#fff5f5' : '', marginTop:'8px'}}>
            <div className={`colores_container ${handleError && !selectedColor.value ? 'shake' : ''}` }>
                <ColorComponent colors={productInfos?.properties.additionalProp1}  selectedColor={selectedColor.value} onSelectColor={handleSelectColor} />
            </div>
            <div className={`sizes_container  ${handleError && !selectedSize.value ? 'shake' : ''}`}>
                <SizeComponent sizes={productInfos?.properties.additionalProp2} selectedSize={selectedSize.value} onSelectSize={handleSelectSize} />
            </div>

            <div className={`shipment_infos  ${handleError && !selectedShippingInfo.id ? 'shake' : ''}`}>
                <ShipmentInfos shippingInfos={productInfos?.shipments} onInfoSelect={handleSelectShippingInfo} />
            </div>
            {
            handleError ? 
                <small className="detail_error_message">Svp, seleksyone {!selectedColor.value || !selectedSize.value? 'Size oubyen koulè' : 'Enfòmasyon pou Livrezon'} pwodui an</small>
            : ''
            }
        </section>
        <section>
        <div className='avalaible_countries'>
            <AvailableCountries countries={productInfos?.available_countries} />
            </div>
        </section>
    </div>
  )
}

import React from 'react';
import Styles from './product-card.module.scss';
import Image from 'next/image';

interface ProductCardProps {
  product: any;
  onRedirectToProductDetails: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const { product } = props;

  return (
    <div className={Styles.see_more_card} key={product.id} onClick={() => props.onRedirectToProductDetails(product.id)}>

      <div className={Styles.top_of_card}>
        <div className={Styles.product_img}>
          <Image src={product.images[0].url} alt="" width={100} height={100} />
          <Image src={product.images[1].url} className={Styles.show_hover} alt="" width={100} height={100} />
        </div>
        <div>
          <p className={Styles.description}>
            {(product.name && product.name.length > 15) ? product.name.substring(0, 15) + '...' : product.name}
          </p>
          <p className={Styles.description}>
            {(product.description && product.description.length > 15) ? product.description.substring(0, 15) + '...' : product.description}
          </p>
        </div>
      </div>
      {/*  */}
      <div className={Styles.bottom}>
        <p className={Styles.currentPrice}>{product.prices.current_price.formatted} </p>
        <p className={Styles.currentPrice}>{product.available_amount} </p>
      </div>
    </div>
  );
};

export default ProductCard;

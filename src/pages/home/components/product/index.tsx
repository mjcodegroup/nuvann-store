import React from 'react';
import { useRouter } from 'next/router';
import Styles from './product-card.module.scss';
import Image from 'next/image';

interface ProductCardProps {
  product: any;
  onRedirectToProductDetails:(id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const { product } = props;
  const router = useRouter();

  // const handleCardClick = () => {
  //   router.push(`/product/${product.id}`);
  // };

  return (
    <div className={Styles.see_more_card} key={product.id} onClick={()=>props.onRedirectToProductDetails(product.id)}>
      <div className={Styles.product_img}>
        <Image src={product.images[0]} alt="" width={100} height={100} />
        <Image src={product.images[1]} className={Styles.show_hover} alt="" width={100} height={100} />
      </div>
      <div className={Styles.bottom}>
        <p className={Styles.daily_deal}>Likidasyon</p>
        <p>
          <i>de <span className={Styles.lastprice}>{product.prices.before.formatted}</span></i>
        </p>
        <p className={Styles.currentPrice}>{product.prices.current.formatted} <span>{product.prices.current.discountPercent} %</span></p>
        <p className={Styles.description}>
          {(product.name && product.name.length > 15) ? product.name.substring(0, 15) + '...' : product.name}
        </p>  
      </div>
    </div>
  );
};

export default ProductCard;

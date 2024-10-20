import React from 'react';
import Styles from './product-card.module.scss';
import Image from 'next/image';
import { FaTag } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';


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
          <Image src={product.images[0]?.url} alt="" width={100} height={100} />
          <Image src={product.images[1]?.url} className={Styles.show_hover} alt="" width={100} height={100} />
        </div>
        <div>
          <p className={Styles.textName}>
            {(product.name && product.name.length > 15) ? product.name.substring(0, 15) + '...' : product.name}
          </p>
          <p className={Styles.description}>
            {(product.description && product.description.length > 15) ? product.description.substring(0, 15) + '...' : product.description}
          </p>
          <p className={Styles.categories}>
            {product.categories.slice(0, 3).map((category: any, index: number) => (
              <span key={index}>
                {(category.name.length > 6) ? category.name.substring(0, 6) + '...' : category.name}
                {index < 2 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className={Styles.bottom}>
        <p className={Styles.currentPrice}>
          <FaTag className={Styles.icon} /> {product.prices.current_price.formatted}
        </p>
        <p className={Styles.currentPrice}>
          <MdShoppingCart className={Styles.icon} /> {product.available_amount}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

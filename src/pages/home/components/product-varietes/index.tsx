import React from 'react';
import Styles from './product-varietes.module.scss';
import { Button } from '@mui/material';
import ProductCard from '../product';

interface SeeMoreProps {
  data: any;
  getmore: any;
  loader: boolean;
  onRedirectToProductDetails:(id: string) => void;  
}

const ProductVarietes: React.FC<SeeMoreProps> = (props: SeeMoreProps) => {
  const { data, getmore, loader } = props;
  return (
    <section className={Styles.see_more_container}>
      <h3 className={Styles.see_more_Title}>Ann Gade</h3>
      <div className={Styles.see_more_section}>
        {loader ? (
          <div>Loading...</div>
        ) : (
          data.map((see: any) => (
            <ProductCard key={see.id} product={see} onRedirectToProductDetails={props.onRedirectToProductDetails}/>
          ))
        )}
      </div>
      <div className={Styles.see_more_button}>
        <Button variant='outlined' href='#' onClick={getmore}>Kontinye gade</Button>
      </div>
    </section>
  );
};

export default ProductVarietes;

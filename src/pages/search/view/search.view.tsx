import React from 'react'
import { SearchProps } from '../types';
import Styles from './search.module.scss';
import ProductFilters from '@/components/product-filters';
import ProductList from '../components/product-list';

export default function Search(props: SearchProps) {
  return (
    <div className={Styles.search_container}>
      <ProductFilters
        resultCount={props.productCount}
        searchQuery={props.searchQuery}
        categories={props.categories}
        onChangeFilters={props.onChangeFilter}
        defaultCheckedPromotion={props.defaultCheckedPromotion}
      />
      <ProductList  
        products={props.products}
        loading={props.loading}
        onRedirectToProductDetails={props.onRedirectToProductDetails}
      />
     </div>
  )
}

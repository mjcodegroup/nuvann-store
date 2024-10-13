import React from 'react'
import { SearchProps } from '../types';
import Styles from './search.module.scss';
import ProductFilters from '@/components/product-filters';
import ProductList from '../components/product-list';
import getDeviceType from '@/utils/get-device-type';
import MobileFiters from '../components/mobile-filters';

export default function Search(props: SearchProps) {
  return (
    <div className={Styles.search_container}>
      { !getDeviceType.isMobile() &&
      <ProductFilters
        resultCount={props.productCount}
        searchQuery={props.searchQuery}
        categories={props.categories}
        onChangeFilters={props.onChangeFilter}
        defaultCheckedPromotion={props.defaultCheckedPromotion}
      />
    }
      
      <aside className={Styles.products__}>
          {getDeviceType.isMobile() &&
            <MobileFiters
            setOpenMobileFilter={props.setOpenMobileFilter}
              openModalFilter={props.openMobileFilter}
              categories={props.categories}
              onChangeFilters={props.onChangeFilter}
              defaultCheckedPromotion={props.defaultCheckedPromotion}
              resultCount={props.productCount}
              searchQuery={props.searchQuery}
            />
          }
        <ProductList  
          products={props.products}
          loading={props.loading}
          onRedirectToProductDetails={props.onRedirectToProductDetails}
        />
     </aside>
      </div>
  )
}

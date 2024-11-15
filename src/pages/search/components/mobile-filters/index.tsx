import React from 'react'
import { BsFilterRight } from "react-icons/bs";
import Styles from './mobile-filters.module.scss';
import { MobileFiltersProps } from '../../types';
import CustomDrawer from '@/components/custom-drawer';
import ProductFilters from '@/components/product-filters';
import { useTranslation } from 'react-i18next';

export default function MobileFiters(props: MobileFiltersProps) {
  const { t } = useTranslation("search");
  return (
    <section className={Styles.mobile_filter_container}>
        <div className={Styles.header}>
            <div className={Styles._count}>
                <h3>{props.searchQuery}</h3>
                <p>{props.resultCount} {t('result_s')}</p>
            </div>
            <BsFilterRight size={25} onClick={()=> props.setOpenMobileFilter(true)}/>
        </div>
        <CustomDrawer puller open={props.openModalFilter} onClose={()=>props.setOpenMobileFilter(false)} anchor='bottom'>
            <ProductFilters {...props} />
        </CustomDrawer>
    </section>
  )
}

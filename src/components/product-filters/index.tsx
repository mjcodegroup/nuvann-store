import React from 'react'
import Styles from './product-filter.module.scss';
import { Category } from '@/contexts/categories/types';
import { useRouter } from 'next/router';
import { FormControlLabel, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FilterProps {
    searchQuery: string;
    resultCount: number;
    categories: any;
    onChangeFilters: (category_id: string, in_promotion: boolean) => void;
    defaultCheckedPromotion?: boolean;
}

export default function ProductFilters(props: FilterProps) {
    const { t } = useTranslation("search");
    const router = useRouter();
    const { category_id } = router.query;

    const handleChangePromotion = (e: any) => {
        props.onChangeFilters(category_id as string, e.target.checked)
    }

  return (
    <div className={Styles.filter_container}>
        <div className = {Styles.__content}>

            <div className={Styles._filtered_header}>
                <h3>{props.searchQuery}</h3>
                <p>{props.resultCount} {t('result_s')}</p>
            </div>

                <FormControlLabel control={<Switch defaultChecked={props.defaultCheckedPromotion} />} label={t('daily_deals')} onChange={handleChangePromotion}/>

            <div className={Styles.category_list}>
                <h4>{t('categories')}</h4>
                <ul>
                    {
                        props.categories?.map((category: Category) => (
                            <li 
                            key={category.id}
                            onClick={()=>props.onChangeFilters(category.id,props.defaultCheckedPromotion as boolean)}
                            className={category_id === category.id ? Styles.selected_category : ''}
                            >
                                {category.name}
                            </li>
                        ))
                    }
                </ul>
            </div>      
        </div>
  </div>
  )
}

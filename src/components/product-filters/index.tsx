import React from 'react'
import Styles from './product-filter.module.scss';
import { Category } from '@/contexts/categories/types';
import { useRouter } from 'next/router';

interface FilterProps {
    searchQuery: string;
    resultCount: number;
    categories: any;
    onSelectCategory: (category: Category) => void;
}

export default function ProductFilters(props: FilterProps) {
    const router = useRouter();
    const { category_id } = router.query;
  return (
    <div className={Styles.filter_container}>
        <div className = {Styles.__content}>

            <div className={Styles._filtered_header}>
                <h3>{props.searchQuery}</h3>
                <p>{props.resultCount} resultado</p>
            </div>

            <div className={Styles.category_list}>
                <h4>Categorias</h4>
                <ul>
                    {
                        props.categories?.map((category: Category) => (
                            <li 
                            key={category.id}
                            onClick={()=>props.onSelectCategory(category)}
                            className={category_id === category.id ? Styles.selected_category : ''}
                            >
                                {category.name}
                            </li>
                        ))
                    }
                </ul>
            </div>

            {/* <h1>Filtre</h1>
            <hr /> */}

            {/* <div className={Styles.tout}>
                <p>Tout</p>
            </div>
            <div className={Styles.mwens_che}> 
                <p>Mwens chè</p>
            </div>
            <div className={Styles.plis_vann}>
                <p>Plis vann</p>
            </div>

            <h3>Kategori</h3>
            <hr /> */}

          
        </div>
  </div>
  )
}

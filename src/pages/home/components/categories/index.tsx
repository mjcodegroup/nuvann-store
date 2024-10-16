import { Avatar } from '@mui/material';
import React from 'react'

import Styles from './jumbotron.module.scss';
import Title from '@/components/title';
import { Category } from '@/contexts/categories/types';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface CategoriesProps {
  data: Category[];
}

const Categories: React.FC <CategoriesProps>  = ({data}) => {
  const { t } = useTranslation("home");
  return (
    <div className={Styles.category_container}>
        <Title title={t("most_popular_categories")} centered/>
        <div className={Styles.category_content}>
        {data?.slice(0,4).map((category:Category) => (
            <div className={Styles._card_container} key={category.id}>
              <div className={Styles._card}>
                <Image src={category.image.url || ''} alt={category.image.alt || ''} width={70} height={70} />
              </div>
                <h3>{category.name}</h3>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Categories;
import React, { use } from 'react'
import Styles from './no-products-found.module.scss';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function NoProductFound() {
    const { t } = useTranslation('search');
  return (
    <div
        className={Styles.no_product_container}
    >
        <div className={Styles._content}>
            <Image src="/assets/icons/not-found.svg" alt="No product found" width={200} height={200} />
            <div className={Styles._right_side}>
                <h3>{t('title')}</h3>
                <ul>
                    <li><strong>{t('check_spelling')}</strong> {t('of_the_words')}</li>
                    <li>{t("use")} <strong>{t('more_generic')}</strong> {t('or_fewer_words')}</li>
                    <li><Link href={'/search'}>{t('browse_categories')}</Link> {t('to_find_product')}</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

import React from 'react';
import Styles from "./card-products.module.scss"
import { useTranslation } from 'react-i18next';

export default function CardProducts() {
  const { t } = useTranslation("checkout");

  return (
    <div className={Styles.products_wrapper}>
        <h4>{t("checkout.title_products_ordered")}</h4>
    </div>
  )
}

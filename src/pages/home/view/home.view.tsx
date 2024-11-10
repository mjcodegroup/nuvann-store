import React from 'react'
// import { useTranslation } from 'react-i18next';
import Hero from '../components/hero';
import { HomeProps } from '../types';
import Jumbotron from '../components/jumbotron';
import ProductSlide from '@/components/product-slider';
import RandomCategories from '../components/random-categories';
import Categories from '../components/categories';
import { useTranslation } from 'react-i18next';

export default function Home(props: Readonly<HomeProps>) {
  const { t } = useTranslation("home");
  const {products } = props;
  return (
    <>
    <Hero
      images={props.heroImages}
      autoSlideInterval={5000}
    />

    <Jumbotron  jumbs={props.jumbsData} />

    <Categories 
      data={props.categories}
    />
    <ProductSlide
      title={t("newProducts")}
      itemToShow={7}
      products={props.new_products.items} 
      havePromo={false}
      isnew
      isLoading={props.loader}
      onRedirectToProductDetails={props.onRedirectToProductDetails}
    />
    <ProductSlide
      itemToShow={6} 
      products={props.promo_products.items}
      title={t("month_clearance")}
      havePromo
      isLoading={props.loader}
      onRedirectToProductDetails={props.onRedirectToProductDetails}
    />
    <RandomCategories />
    <ProductSlide
      itemToShow={4} 
      multipleRows
      products={products.items}
      title={t("best_sellers")}
      isLoading={props.loader}
      onRedirectToProductDetails={props.onRedirectToProductDetails}
    />
    </>
  )
}

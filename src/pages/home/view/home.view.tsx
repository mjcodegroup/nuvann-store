import React from 'react'
import { useTranslation } from 'react-i18next';
import Hero from '../components/hero';
import { HomeProps } from '../types';
import Jumbotron from '../components/jumbotron';
import ProductSlide from '@/components/product-slider';
import RandomCategories from '../components/random-categories';
import Categories from '../components/categories';

export default function Home(props: Readonly<HomeProps>) {
  const { t } = useTranslation("home");
  const {products } = props;
  return (
    <div suppressHydrationWarning>
    <Hero
      images={props.heroImages}
      autoSlideInterval={5000}
    />

    <Jumbotron  jumbs={props.jumbsData} />

    <Categories 
      data={props.categories}
    />
    <ProductSlide
      title={t("home.newProducts")}
      itemToShow={4}
      products={products.items} 
      havePromo={false}
      isnew
      isLoading={props.loader}
      onRedirectToProductDetails={props.onRedirectToProductDetails}
    />
    <ProductSlide
      itemToShow={4} 
      products={products.items}
      title={t("home.month_clearance")}
      havePromo
      isLoading={props.loader}
      onRedirectToProductDetails={props.onRedirectToProductDetails}
    />
    <RandomCategories />
    <ProductSlide
      itemToShow={4} 
      multipleRows
      products={products.items}
      title={t("home.month_clearance")}
      havePromo
      isLoading={props.loader}
      onRedirectToProductDetails={props.onRedirectToProductDetails}
    />
    {/* <ProductVarietes
      loader={false}
      data={products.items as any} 
      getmore={()=>{}}
      onRedirectToProductDetails={props.onRedirectToProductDetails}
    /> */}
    </div>
  )
}

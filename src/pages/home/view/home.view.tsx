import React from 'react'
// import { useTranslation } from 'react-i18next';
import Hero from '../components/hero';
import { HomeProps } from '../types';
import Jumbotron from '../components/jumbotron';
import ProductSlide from '@/components/product-slider';
import RandomCategories from '../components/random-categories';
import ProductVarietes from '../components/product-varietes';
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
      title="Likidasyon pou Mwa an"
      havePromo
      isLoading={props.loader}
      onRedirectToProductDetails={props.onRedirectToProductDetails}
    />
    <RandomCategories />
    {/* <ProductVarietes
      loader={false}
      data={products.items as any} 
      getmore={()=>{}}
      onRedirectToProductDetails={props.onRedirectToProductDetails}
    /> */}
    </>
  )
}

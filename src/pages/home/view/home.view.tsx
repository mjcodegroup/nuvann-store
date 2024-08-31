import React from 'react'
// import { useTranslation } from 'react-i18next';
import Hero from '../components/hero';
import { HomeProps } from '../types';
import Jumbotron from '../components/jumbotron';
import ProductSlide from '@/components/product-slider';
import productListMock from '@/utils/mocks/home/product-list';
import RandomCategories from '../components/random-categories';
import ProductVarietes from '../components/product-varietes';

export default function Home(props: Readonly<HomeProps>) {
  // const { t } = useTranslation();
  return (
    <>
    <Hero
      images={props.heroImages}
      autoSlideInterval={5000}
    />
    <Jumbotron 
      data={props.jumbotronData}
    />
    <ProductSlide
      title="Nouvo pwodui"
      itemToShow={4}
      slides={productListMock} 
      havePromo={true} 
      isLoading={false}
      onRedirectToProductDetails={props.onRedirectToProductDetails}
    />
    <ProductSlide
      itemToShow={4} 
      slides={productListMock}
      title="Likidasyon pou Mwa an"
      havePromo={true}
      isLoading={false}
      onRedirectToProductDetails={props.onRedirectToProductDetails}
    />
    <RandomCategories />
    <ProductVarietes
      loader={false}
      data={productListMock} 
      getmore={()=>{}}
      onRedirectToProductDetails={props.onRedirectToProductDetails}
    />
    </>
  )
}

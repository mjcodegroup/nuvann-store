import React, { useCallback } from 'react'
import Home from '../view/home.view'
import { HomePageDefault } from '@/components/home-page-default'
import heroImagesMock from '@/utils/mocks/home/hero-images-slider.mock'
import jumbArrayMock from '@/utils/mocks/home/jumbotron.mock'
import { useRouter } from 'next/router'

export default function HomeController() {
  const router = useRouter();

  const handleRedirectToDetailsPage = useCallback((productId: string) => {
    router.push(`/product/${productId}`);
  }, [router]);
  
  return (
    <HomePageDefault>
      <Home heroImages={heroImagesMock} jumbotronData={jumbArrayMock} onRedirectToProductDetails={handleRedirectToDetailsPage}/>
    </HomePageDefault>
  )
}

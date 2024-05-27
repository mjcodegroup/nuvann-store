import React from 'react'
import Home from '../view/home.view'
import { HomePageDefault } from '@/components/home-page-default'
import heroImagesMock from '@/utils/mocks/home/hero-images-slider.mock'

export default function HomeController() {
  return (
    <HomePageDefault>
      <Home heroImages={heroImagesMock}/>
    </HomePageDefault>
  )
}

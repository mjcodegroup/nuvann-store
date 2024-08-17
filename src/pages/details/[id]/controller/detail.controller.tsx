import React from 'react'
import { HomePageDefault } from '@/components/home-page-default'
import Details from '../view/detail.view'

export default function DetailController() {
  return (
    <HomePageDefault>
      <Details product={11} />
    </HomePageDefault>
  )
}

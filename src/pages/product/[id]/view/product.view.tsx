import React from 'react'
import { ProductProps } from '../types';

export default function Product(props: Readonly<ProductProps>) {
  console.log(props.productId)
  return (
    <>
        <h1>Details</h1>
    </>
  )
}

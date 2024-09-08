import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Styles from './product-slider.module.scss'

import Title from "../title";
import SampleNextArrow from "./sample-next-arrow";
import SamplePrevArrow from "./sample-prev-arrow";
import { SliderProps } from "./types";



export default function ProductSlide (props: SliderProps){

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  
  return (
    <section className={Styles.custom_slide_section}>
      <Title title={props.title} />
      {!props.isLoading ? (
        props.products && props.products.length > 0 ? (

        <Slider {...settings} centerPadding="100">
            {props.products?.map((product: any, index: any) => (
            <div className={Styles.card_home} key={product.id} onClick={()=> props.onRedirectToProductDetails(product.id)}>
                {props.isnew && (
                  <div className={Styles.product_new_label}>Nouvote</div>
                )}
              <div className={Styles.__card}>
                <div className={Styles.product_img}>
                  <Image src={product.images[0].url} alt="" width={100} height={100}/>
                  <Image src={product.images[1].url} className={Styles.show_hover} alt="" width={100} height={100}/>
                </div>
                <div className={Styles.img_separator}></div>
                <div className={Styles.bottom}>
                  {props.havePromo && (
                    <p className={Styles.daily_deal}>Òf pou jou an</p>
                  )}
                    <p>
                      <i><span className={Styles.lastprice}> {product.prices.original_price?.formatted}</span></i>
                    </p>
                    <p className={Styles.currentPrice}>{product.prices.current_price.formatted}
                    {
                      product.prices.current_price.discountPercent &&
                      <span>{product.prices.current_price.discountPercent} % OFF</span>
                    }
                    </p>
                  <h2>
                    {(product.name && product.name.length > 50) ? product.name.substring(0, 50)+'...' : product.name}
                  </h2>
                    {/* <p className='description'>
                      {(product.name && product.name.length > 80) ? product.name.substring(0, 80)+'...' : product.name}
                    </p>   */}
                </div>
              </div>
            </div>
            ))}
        </Slider>
          ) : (
            <div style={{
              textAlign: 'center',
              color: 'gray'
            }}>
              Pa gen Pwodui Disponib
            </div>
          )
        ) : (
          <div className='skeleton_container'>
            loading..........
            {/* {Array.from({ length: 4 }).map((_, index) => (
              <Card>
                <CardMedia component={Skeleton} variant="rectangular" height={200} />
                <CardContent>
                  
                </CardContent>
              </Card>
              ))} */}
          </div>
        )}
      </section>
    );
  };
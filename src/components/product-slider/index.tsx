import React, { useState, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Styles from './product-slider.module.scss';

import Title from "../title";
import SampleNextArrow from "./sample-next-arrow";
import { SliderProps } from "./types";
import { SamplePrevArrow } from "./sample-prev-arrow";
import { truncateStringWithEllipsis } from "@/utils/truncate-string-with-ellipsis";
import { ProductSlideSkeleton } from "./product-slider-skeleton";
import { useTranslation } from "react-i18next";
import getDeviceType from "@/utils/get-device-type";


export default function ProductSlide(props: SliderProps) {
  const { t } = useTranslation("home");
  const [showArrows, setShowArrows] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [showPrev, setShowPrev] = useState(false);
  const sliderRef = useRef<any>(null);

  const settingsMultiRows = {
    infinite: true,
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow:  getDeviceType.isMobile() ? 1 : props.itemToShow || 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: props.itemToShow || 2,
          rows: 3,
          slidesPerRow: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          rows: 2,
          slidesPerRow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          rows: 2,
          slidesPerRow: 1,
  
        }
      }
    ],
  };

  const settings:any = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: props.itemToShow || 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
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
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true

        }
      }
    ],
    nextArrow: showArrows && showNext ? <SampleNextArrow /> : null,
    prevArrow: showArrows && showPrev ? <SamplePrevArrow /> : null,
    afterChange: (current: number) => {
      const slider = sliderRef.current;
      if (slider) {
        setShowPrev(current > 0);
        setShowNext(current + slider.props.slidesToShow < props.products.length);
      }
    }
  };

  const isMultiRows = props.multipleRows ?settingsMultiRows: settings;


  const handleMouseEnter = () => setShowArrows(true);
  const handleMouseLeave = () => setShowArrows(false);

  return (
    <section
      className={Styles.custom_slide_section}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Title title={props.title} />
      {!props.isLoading ? (
        props.products && props.products.length > 0 ? (
          <Slider ref={sliderRef} {...isMultiRows} centerPadding="100">
            {props.products?.map((product:any, index: any) => (
              <div className={Styles.card_home} key={product.id}>
                {props.isnew && (
                  <div className={Styles.product_new_label}>{t("new")}</div>
                )}
                <div className={Styles.__card} onClick={() => props.onRedirectToProductDetails(product.id)}>
                  <div className={Styles.product_img}>
                    <Image src={product.images?.[0]?.url} alt="" width={100} height={100} />
                    <Image src={product.images?.[1]?.url} className={Styles.show_hover} alt="" width={100} height={100} />
                  </div>
                  <div className={Styles.img_separator}></div>
                  <div className={Styles.bottom}>
                    {(product.prices.current_price.discount.percent && props.havePromo) ? (
                      <p className={Styles.daily_deal}>{t("today_deals")}</p>
                    ): ''}
                    {
                      (product.prices.current_price.discount.percent && props.havePromo) && product.prices.current_price.discount.percent ? (
                        <p>
                          <i>
                            <span className={Styles.lastprice}>
                              {product.prices.original_price?.formatted}
                            </span>
                          </i>
                        </p>
                      ) : ''
                    }
                    <p className={Styles.currentPrice}>{product.prices.current_price.formatted}
                      {
                        (product.prices.current_price.discount.percent && props.havePromo) && <span>{product.prices.current_price.discount.percent}% OFF</span>
                      }
                    </p>
                    <h2>
                      {truncateStringWithEllipsis(product.name, 18)}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div style={{ textAlign: 'center', color: 'gray' }}>
            {t("no_products_found")}
          </div>
        )
      ) : (
         <ProductSlideSkeleton itemToShow={4}/>
      )}
    </section>
  );
};

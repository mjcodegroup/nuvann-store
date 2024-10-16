import React, { useEffect, useRef, useState } from 'react'
import {GrLinkNext} from 'react-icons/gr'
import Styles from './pagging-slider.module.scss';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface PaggingSliderProps {
  images: ImagesData[];
}

interface ImagesData {
    id: string;
    title: string;
    url: string;
    alt: string;
}

const PaggingSlides: React.FC<PaggingSliderProps> =({images}) =>{
  const [slideIndex, setSlideIndex] =useState<number>(1);
  const [width, setWidth] =useState(0);
  const [start, setStart] =useState(0);
  const [change, setChange] =useState(0);
  const counts: any = images?.length

  const slideRef: any = useRef();

  useEffect(() => {
    if(!slideRef.current) return;
    const scrollWidth = slideRef.current.scrollWidth
    const chiledrenElementCount = slideRef.current.childrenElementCount
    const width = scrollWidth /chiledrenElementCount
    setWidth(width)
  }, [])

  


  const settings = {
    customPaging: function(i: any) {
      return (
        <a>
          <Image src={images?.[i]?.url || ''} alt={images?.[i]?.alt || ''} width={100} height={100}/>
        </a>
      );
    },
    infinite: images && images.length > 1 ? true : false,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  return (
    <div className={Styles.slider_container}>
      <Slider {...settings}>
        {
          images?.map((image, index) => (
            <div key={index} className={Styles._slider}>
              <Image src={image.url} alt={image.alt} width={100} height={100}/>
            </div>
          ))
        }
      </Slider>
    </div>
  )
}

export default PaggingSlides;
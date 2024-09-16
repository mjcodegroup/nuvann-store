import React, { useEffect, useRef, useState } from 'react'
import {GrLinkNext} from 'react-icons/gr'
import Styles from './pagging-slider.module.scss';
import Image from 'next/image';
interface PaggingSliderProps {
  images: ImagesData[] | undefined;
}

interface ImagesData {
    id: string;
    title: string;
    url: string;
    alt: string;
}

const PaggingSlides: React.FC<PaggingSliderProps> =({images}) =>{
  const [slideIndex, setSlideIndex] =useState(1);
  const [width, setWidth] =useState(0);
  const [start, setStart] =useState(0);
  const [change, setChange] =useState(0);
  const counts: any = images?.length

  const plusSlides =(n:number) => {
    setSlideIndex(prev => prev + n);
    slideShow(slideIndex + n)
  }

  const slideRef: any = useRef();

  useEffect(() => {
    if(!slideRef.current) return;
    const scrollWidth = slideRef.current.scrollWidth
    const chiledrenElementCount = slideRef.current.childrenElementCount
    const width = scrollWidth /chiledrenElementCount
    setWidth(width)
  }, [])
  

  const slideShow = (n:number) => {
    if(n> counts) {setSlideIndex(1)}
    if(n< 1) {setSlideIndex(counts)}
  }

  function dragStart(e: any) {
    setStart(e.clientX)
  }
  function dragOver(e: any) {
    let touch = e.clientX;
    setChange(start - touch)
  }
  function dragEnd(e: any) {
    if(change > 0) {
      slideRef.current.scrollLeft += 50
    } else {
      slideRef.current.scrollLeft -= 50
    }
  }

  return (
    <div className={Styles.product_details}>
      <div className={Styles.slider_images} draggable={true} ref={slideRef}
        onDragStart={dragStart} onDragOver={dragOver} onDragEnd={dragEnd}>
          {
            images?.map((img: ImagesData, index:number)=> (
              <div
                key={img.id}
                className={`${Styles.slider_box} ${(index+1 === slideIndex) && Styles.active}}`} 
                onClick={() => setSlideIndex(index + 1)}
              >
                <Image src={img.url} alt={img.alt} width={100} height={100}/>
              </div>
            ))
          }
        </div>
          
        <div className={Styles.product_page_img}>
          {
          images?.map((img: ImagesData, index:number)=> (
            <div
              key={index} className={Styles.slides}
              style={{display:(index+1) ===slideIndex ?"block" : "none"}}
            >
              <Image src={img.url} alt={img.alt} width={100} height={100}/>
            </div>
          ))
          }

          <a href="#!" className={Styles.prev} onClick={()=> plusSlides(-1)}> &#10094;</a>
          <a href="#!" className={Styles.next} onClick={()=> plusSlides(1)}> &#10095;</a>
          {/* <GrLinkNext className='next' /> */}
        </div>
    </div>
  )
}

export default PaggingSlides;
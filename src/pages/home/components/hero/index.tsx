import React from 'react';
import Image from 'next/image';
import Styles from './hero.module.scss';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';

type HeroProps = {
  images: string[];
  autoSlideInterval?: number;
};

const Hero: React.FC<HeroProps> = ({ images, autoSlideInterval }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };
  return (
    <div className={Styles.carousel}>
      <div className={Styles.__slider} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className={Styles.__slide}>
            <Image src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button aria-label='_prev' name='_prev' className={Styles.__prev_btn} onClick={handlePrevSlide}>
        <FaCircleArrowLeft />
      </button>
      <button aria-label='_next' name='_next' className={Styles.__next_btn} onClick={handleNextSlide}>
        <FaCircleArrowRight />
      </button>
    </div>
  );
};

export default Hero;
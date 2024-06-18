import React from 'react'
import Image from 'next/image'
import Styles from './random-categories.module.scss'
import randomcategoriesImagesMock from '@/utils/mocks/home/random-categories-images.mock'

interface MyObjectType {
    img: string;
    link: string;
  }

const RandomCategories: React.FC = () => {
   
    const [randomObjects, setRandomObjects] = React.useState<MyObjectType | any>(null);

    React.useEffect(() => {
    getRandomObject();
    }, [])

    const getRandomObject = () => {
        const randomIndices: number[] = [];
        while (randomIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * randomcategoriesImagesMock.length);
            if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
            }
        }
        const deferredRandomObjects: any = randomIndices.map((index) => randomcategoriesImagesMock[index]);
        setRandomObjects(deferredRandomObjects);
    };
  return (
    <> 
        <div  className={Styles.home_category_random}>
          {randomObjects?.map((rand:MyObjectType, index:number) => (
            <Image src={rand.img} alt={rand.link} key={rand.img + index} width={100} height={200}/>
          ))}
        </div>
    </>
  )
}

export default RandomCategories;
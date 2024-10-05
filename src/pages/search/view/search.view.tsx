import { useNavigation } from '@/hooks/useNavigation';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import Image from 'next/image';
import React from 'react'
import { SearchProps } from '../types';
import Styles from './search.module.scss';
import { Product } from '@/contexts/products/types';

export default function Search(props: SearchProps) {
    const { redirect } = useNavigation();
  return (
    <div className={Styles.search_container}>
    <div className={Styles.left_side}>
      <div className = {Styles.first_child}>
          <h2>Pwomosyon</h2>  

          <h1>Filtre</h1>
          <hr />

          <div className={Styles.tout}>
            <p>Tout</p>
          </div>
          <div className={Styles.mwens_che}> 
            <p>Mwens chè</p>
          </div>
          <div className={Styles.plis_vann}>
            <p>Plis vann</p>
          </div>

          <h3>Kategori</h3>
          <hr />

          <ul>
            <li>Tout</li>
            <li>Alimantè</li>
            <li>Enfòmatik</li>
            <li>Vètman</li>
            <li>Kosmetik</li>
            <li>Netwayaj</li>
            <li>Espo</li> 
            <li>Edikasyon</li>
            <li>Elektwomenaje</li> 
            <li>Mèb</li> 
            <li>Lòt</li>
          </ul>
      </div>

    </div>
      <div className={Styles.right_side__promotion}>
        <div className={Styles.sub_right}>
          {props.loading ?
              <>
            {/* <CustomSkeleton variant="rectangular" width="100%" height={40} animation="wave" /> */}
            {/* <CustomSkeleton variant="rectangular" width="100%" height={40} animation="wave" /> */}
            {/* <CustomSkeleton variant="rectangular" width="100%" height={40} animation="wave" /> */}
              </>
          :
          <>
            {props.products?.items?.map((prod:Product, index:number) => (
             <div className={Styles.card_1} key={prod.id} onClick={()=>{redirect(`/product/${prod.id}` as RoutesUrls)}}>
             <div className={Styles.product_img}>
               <Image src={prod?.images?.[0]?.url || ''} alt="" width={100} height={100}/>
               <Image src={prod.images?.[1]?.url || ''} className={Styles.show_hover} alt="" width={100} height={100}/>
             </div>
             {/* <h2>
               {(prod.name && prod.name.length > 35) ? prod.name.substring(0, 35)+'...' : prod.name}
             </h2> */}
             <div className={Styles.bottom}>
               <p className={Styles.daily_deal}>Likidasyon</p>
               <p>
                 <i>de <span className={Styles.lastprice}> {prod.prices?.before?.formatted}</span></i>
               </p>
               <p className={Styles.currentPrice}>{prod.prices?.current?.formatted} <span>{prod.prices?.current?.discountPercent} %</span></p>
               <p className={Styles.description}>
               {(prod.name && prod.name.length > 80) ? prod.name.substring(0, 80)+'...' : prod.name}
               </p>  
             </div>
           </div>
            ))}
          </>
          }
            </div>
          </div>
     </div>
  )
}

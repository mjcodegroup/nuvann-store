import React from 'react'
import Styles from './product-varietes.module.scss'
import { Button } from '@mui/material';
import Image from 'next/image';
  
  interface SeeMoreProps {
    data: any;
    getmore: any;
    loader: boolean
  }

const ProductVarietes: React.FC <SeeMoreProps>  = ({data, getmore, loader}) => {
    // const navigate = useNavigate();

  return (
    <section className={Styles.see_more_container}>
      <h3 className={Styles.see_more_Title}>Ann Gade</h3>
      <div className={Styles.see_more_section}>
      {loader ? (
          // Renderizar o skeleton loader enquanto os dados estão sendo carregados
          <>
          {/* {Array.from({ length: 4 }).map((_, index) => (
            <Card>
              <CardMedia component={Skeleton} variant="rectangular" height={200} />
              <CardContent>
                
              </CardContent>
            </Card>
            ))} */}
          </>

        ) : (
        data.map((see: any) => (
            <div className={Styles.see_more_card} key={see.id} onClick={()=>{}}>
                <div className={Styles.product_img}>
                  <Image src={see.images[0]} alt="" width={100} height={100}/>
                  <Image src={see.images[1]} className={Styles.show_hover} alt="" width={100} height={100}/>
                </div>
                {/* <h2>
                {(promo.name && promo.name.length > 35) ? promo.name.substring(0, 35)+'...' : promo.name}
                </h2> */}
                <div className={Styles.bottom}>
                <p className={Styles.daily_deal}>Likidasyon</p>
                <p>
                    <i>de <span className={Styles.lastprice}> {see.prices.before.formatted}</span></i>
                </p>
                <p className={Styles.currentPrice}>{see.prices.current.formatted} <span>{see.prices.current.discountPercent} %</span></p>
                <p className={Styles.description}>
                {(see.name && see.name.length > 15) ? see.name.substring(0, 15)+'...' : see.name}
                </p>  
                </div>
            </div>
        ))
        )
      }
      </div>
    <div className={Styles.see_more_button}>
      <Button variant='outlined' href='#' onClick={getmore}>Kontinye gade</Button>
    </div>
    </section>
  )
}

export default ProductVarietes;
import React, { useCallback } from 'react'
import Home from '../view/home.view'
import { HomePageDefault } from '@/components/home-page-default'
import heroImagesMock from '@/utils/mocks/home/hero-images-slider.mock'
import { categoriesMock, jumDataMock } from '@/utils/mocks/home/jumbotron.mock'
import { useProducts } from '@/contexts/products'
import { useNavigation } from '@/hooks/useNavigation'
import { RouteUrl } from '@/utils/enums/routesUrl'
import { useProductsInfo } from '@/hooks/use-products-info'

export default function HomeController() {
  const {state: homeState, dispatch: homeDispatch} = useProducts();
  const {getProducts} = useProductsInfo();
  const {redirect} = useNavigation();

  const handleRedirectToDetailsPage = useCallback((productId: string) => {
    redirect(`/product/${productId}` as RouteUrl);
  }, [redirect]);

  async function getHomeInformations() {
    try {
        await getProducts();
      } catch (error) {
        console.log("algo deu errado")
      }
    }
    
    React.useEffect(() => {
      getHomeInformations();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    // <HomePageDefault>
      <Home
        loader={homeState.isLoading}
        heroImages={heroImagesMock}
        jumbsData={jumDataMock}
        products={homeState.products}
        categories={categoriesMock} 
        onRedirectToProductDetails={handleRedirectToDetailsPage}
      />
    // </HomePageDefault>
  )
}

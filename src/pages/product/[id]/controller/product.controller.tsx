import React, { useEffect } from 'react'
import { HomePageDefault } from '@/components/home-page-default'
import Product from '../view/product.view'
import { useParams } from 'next/navigation';
import { useProducts } from '@/contexts/products';
import { useProductsInfo } from '@/hooks/use-products-info';
import { useAuth } from '@/hooks/useKeycloak';
import { useCartInfo } from '@/hooks/use-cart-info';
import { useNavigation } from '@/hooks/useNavigation';
import { RoutesUrls } from '@/utils/enums/routesUrl';

export default function ProductController() {
  const params = useParams<{ id: string; }>()
  const {redirect} = useNavigation();
  const { state: productDetails, dispatch: productDetailsDispatch } = useProducts();
  const { isAuthenticated} = useAuth();
  const {addProductToCart, isLoading: cartLoader} = useCartInfo();


  const { getProductDetails } = useProductsInfo();
  const [selectedSize, setSelectedSize] = React.useState({
    key:"",
    value : ""
});

const [selectedShippingInfo, setSelectedShippingInfo] = React.useState({id:0});

const [selectedColor, setSelectedColor] = React.useState({
key: "",
value: ""
});
const [qty, setQty] = React.useState<number>(1);

  
const [handleError, sethandleError] = React.useState<boolean>(false)

  const handleSelectColor = (color:any) => {
    setSelectedColor({
      key: "color",
      value:color
    });
    sethandleError(false)
  };

  const handleIncrement = () =>{
    setQty(qty+1);
  }

  const handleDecrement = ()=> {
    if(qty>1) {
      setQty(qty-1);
    }
  }

  const handleChangeQuantity = (qty: number) => {
    setQty(Number(qty));
  }

  function handleCartValidation(){
    const color = !!(productDetails.product?.properties?.color?.length && !selectedColor?.value)
    const size = !!(productDetails.product?.properties?.size?.length && !selectedSize?.value)

    // if(color || size || !selectedShippingInfo?.id) {
      if(color || size) {
        sethandleError(true)
      return false;
    } else {
      sethandleError(false)
      return true;
    }
  }

const handleAddProductToCart = async() => {
  const ifExist = [
    selectedSize,
    selectedColor
  ]
  const properties: any = ifExist?.filter(exist=> {
    return exist.value
  })
  if(isAuthenticated) {
    if(handleCartValidation()) {
      await addProductToCart({
       product_id: String(productDetails.product.id),
       quantity: qty,
       shipment_id:  selectedShippingInfo.id> 0 ? String(selectedShippingInfo.id) : undefined,
       properties
      });
    }
  } else {
      redirect(RoutesUrls.CARTS)
  }
}


  async function getDetailsInformations(id: string) {
    try {
      await getProductDetails(id);
    } catch (error) {
      console.log("algo deu errado")
    }
  }


  useEffect(() => {
    if (params?.id) getDetailsInformations(params?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id])

  const handleSelectShippingInfo = (selectedShippingInfo: any) => {
    console.log(selectedShippingInfo)
    setSelectedShippingInfo(selectedShippingInfo);
    sethandleError(false)
  };

  const handleSelectSize = (size: any) => {
    setSelectedSize({
      key: "size",
      value: (size).toString()
    });
    sethandleError(false)
  };


  return (
    <HomePageDefault>
      <Product
        product={productDetails.product}
        fullLoading={productDetails.isLoading}
        onSelectedShippingInfo={handleSelectShippingInfo}
        onSelectedSize={handleSelectSize}
        sectedSize={selectedSize}
        onError={handleError}
        qty={qty}
        isLoading={cartLoader}
        selectedShippingInfo={selectedShippingInfo}
        selectedSize={selectedSize}
        onSelectedColor={handleSelectColor}
        selectedColor={selectedColor}
        onChangeQuantity={handleChangeQuantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onAddToCart={handleAddProductToCart}
        onPurchase={handleAddProductToCart}
      />
    </HomePageDefault>
  )
}

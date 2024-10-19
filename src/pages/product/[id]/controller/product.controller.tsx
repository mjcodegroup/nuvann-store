import React, { useEffect } from 'react'
import { HomePageDefault } from '@/components/home-page-default'
import Product from '../view/product.view'
import { useParams } from 'next/navigation';
import { useProducts } from '@/contexts/products';
import { useProductsInfo } from '@/hooks/use-products-info';
import { useCartInfo } from '@/hooks/use-cart-info';
import { useNavigation } from '@/hooks/useNavigation';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useAuth0 } from '@auth0/auth0-react';


interface SizeandProductIE {
  key: string;
  value: string;
}
export default function ProductController() {
  const params = useParams<{ id: string; }>()
  const { redirect } = useNavigation();
  const { state: productDetails } = useProducts();
  const { getProductDetails } = useProductsInfo();
  const { isAuthenticated } = useAuth0();

  const { addProductToCart, isLoading: cartLoader} = useCartInfo({isAuthenticated});
  const [ selectedSize, setSelectedSize] = React.useState({} as SizeandProductIE);
  // const [ selectedShippingInfo, setSelectedShippingInfo] = React.useState({id:0});
  const [ selectedColor, setSelectedColor] = React.useState({} as SizeandProductIE);
  const [ qty, setQty] = React.useState<number>(1);
  const [ handleError, sethandleError] = React.useState<boolean>(false)

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
  // const defaultInfo = productDetails.product.shipments ? productDetails?.product?.shipments.find((info: any) => info?.default_shipment) : {id:0};
  if(isAuthenticated) {
    if(handleCartValidation()) {
      await addProductToCart({
       product_id: String(productDetails.product.id),
       quantity: qty,
      //  shipment_id:  selectedShippingInfo.id ? String(selectedShippingInfo?.id) : defaultInfo?.id,
       properties: properties.length ? properties : undefined
      });
    }
  } else {
      redirect(RoutesUrls.CARTS)
  }
}

  // const handleSelectShippingInfo = (selectedShippingInfo: any) => {
  //   setSelectedShippingInfo(selectedShippingInfo);
  //   sethandleError(false)
  // };

  const handleSelectSize = (size: any) => {
    setSelectedSize({
      key: "size",
      value: (size).toString()
    });
    sethandleError(false)
  };

  useEffect(() => {
    if (params?.id) getProductDetails(params?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id])

  return (
    <HomePageDefault>
      <Product
        product={productDetails.product}
        fullLoading={productDetails.isLoading}
        onSelectedShippingInfo={()=>null}
        onSelectedSize={handleSelectSize}
        selectedShippingInfo={null}
        sectedSize={selectedSize}
        onError={handleError}
        qty={qty}
        isLoading={cartLoader}
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

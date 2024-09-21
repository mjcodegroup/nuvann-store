export enum RoutesUrls {
    BASE_url = '/',
    HOME = '/home',
    PRODUCT_DETAILS_PAGE = '/product',
    CARTS = '/carts',
    CHECKOUT = '/checkout',
}

export type RouteUrl = 
    |RoutesUrls.BASE_url 
    |RoutesUrls.HOME
    |RoutesUrls.PRODUCT_DETAILS_PAGE
    |RoutesUrls.CARTS
    |RoutesUrls.CHECKOUT;
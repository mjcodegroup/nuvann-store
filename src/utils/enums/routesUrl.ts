export enum RoutesUrls {
    BASE_url = '/',
    HOME = '/home',
    PRODUCT_DETAILS_PAGE = '/product',
    CARTS = '/carts',
    ORDERS = '/orders',
}

export type RouteUrl = 
    | RoutesUrls.BASE_url 
    | RoutesUrls.HOME
    | RoutesUrls.PRODUCT_DETAILS_PAGE
    | RoutesUrls.CARTS
    | RoutesUrls.ORDERS;

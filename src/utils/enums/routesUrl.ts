export enum RoutesUrls {
    BASE_url = '/',
    HOME = '/home',
    PRODUCT_DETAILS_PAGE = '/product',
    CARTS = '/carts',
    ORDERS = '/orders',
    CHECKOUT = '/checkout',
    ORDERS_DETAILS = '/orders-details',
    SELLER_DETAILS = '/seller-details',
    Login  = '/login',
}

export type RouteUrl = 
    | RoutesUrls.BASE_url 
    | RoutesUrls.HOME
    | RoutesUrls.PRODUCT_DETAILS_PAGE
    | RoutesUrls.CARTS
    | RoutesUrls.ORDERS
    | RoutesUrls.CHECKOUT
    | RoutesUrls.ORDERS_DETAILS
    | RoutesUrls.SELLER_DETAILS
    | RoutesUrls.Login;

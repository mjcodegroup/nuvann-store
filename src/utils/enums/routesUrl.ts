export enum RoutesUrls {
    BASE_url = '/',
    HOME = '/home',
}

export type RouteUrl = 
    |RoutesUrls.BASE_url 
    |RoutesUrls.HOME;
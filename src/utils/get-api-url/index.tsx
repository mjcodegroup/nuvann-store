
const Environment: any = {
    dev: {
        NUVANN_API: process.env.NEXT_PUBLIC_CATALOG_API_URL_DEV
    },
    prod: {
        NUVANN_API: process.env.NEXT_PUBLIC_CATALOG_API_URL_PROD
    }
}

const ENV: string = process.env.NODE_ENV;
export default Environment[ENV];

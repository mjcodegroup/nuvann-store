import cookie from '@/utils/cookie';
import axios from 'axios'
import { getCookie } from 'cookies-next';

const handleError = (error: any ) => {

    const errorMessage = {message: '', fieldError:{}};

    const {response} = error;

    if(response?.status && [401, 403].includes(response?.status) ) {
        // localStorage.removeItem('@cashLakay:token')
        // localStorage.removeItem('@cashLakay:user')

        const {protocol, host } = window.location;

        console.log("Sua sessão expirou, por favor faça login novamente")
        cookie.deleteCookie('access_token');
        cookie.deleteCookie('user');
        // window.location.replace(`${protocol}//${host}/login`)
    }

    return Promise.reject({ ...error, errorMessage});
};

const handleResponse = (response: any) => {
    return response
}



export const nuvannApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CATALOG_API_URL,
});

nuvannApi.interceptors.response.use(handleResponse, handleError);

nuvannApi.interceptors.request.use(
    async (config: any) => {
         const TOKEN = getCookie('access_token');
         const selectedLanguage = getCookie('NEXT_I18LANG');

        config.headers = {
            ...config.headers,
            Authorization: TOKEN ? `Bearer ${TOKEN}`: '',
            'Accept-Language' : selectedLanguage || process.env.NEXT_I18LANG
        };

        return config;
    },
    (error:any) => {
        Promise.reject(error);
    },
)
import axios from 'axios'
import { getCookie } from 'cookies-next';

const handleError = (error: any ) => {

    const errorMessage = {message: '', fieldError:{}};

    const {response} = error;

    if(response?.status && [401, 403].includes(response?.status) ) {
        // localStorage.removeItem('@cashLakay:token')
        // localStorage.removeItem('@cashLakay:user')

        const {protocol, host } = window.location;

        alert("Sua sessão expirou, por favor faça login novamente")
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

        config.headers = {
            ...config.headers,
            Authorization: TOKEN ? `Bearer ${TOKEN}`: ''
        };

        return config;
    },
    (error:any) => {
        Promise.reject(error);
    },
)
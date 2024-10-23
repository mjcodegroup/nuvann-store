import { NextResponse } from "next/server";
import cookie from "../cookie";

class SessionManager { 
    setSession(value: any) {
       cookie.setCookie({name:'nuvann-valid-token', value, days: 1, domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ''});
    }

    getValidToken() {
        return cookie.getCookie('nuvann-valid-token');
    }
    
    isAuthenticated() {
        return !!this.getValidToken();
    }

    redirectToLogin(req:any) {
        // const {protocol, host } = window.location;
        // cookie.deleteCookie('user');
        return
        // const loginUrl = new URL('/login', req.url);
        // return NextResponse.redirect(loginUrl);
        // window.location.replace(`${protocol}//${host}/login`)
    }

    saveCurrentPathToStorage = (path: string) => {
        if (typeof window !== 'undefined') {
            cookie.setCookie({name: 'returnTo', value: path, days: 1, domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || '' });
            localStorage.setItem('returnTo', path);
        }
      };
      
    getSavedPathFromStorage = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('returnTo') || '/';  // Recupera ou redireciona para a home
        }
      };
      
    clearSavedPathFromStorage = () => {
        localStorage.removeItem('returnTo');  // Limpa o valor salvo
    };
}


const sessionManager = new SessionManager();
export default  sessionManager;
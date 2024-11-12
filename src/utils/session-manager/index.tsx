import cookie from "../cookie";

class SessionManager { 
    setSession(value: any) {
       cookie.setCookie({name:'nuvann-valid-token', value, days: 1, domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ''});
    }

    clearSession() {
        cookie.deleteCookie('nuvann-valid-token');
    }

    getValidToken() {
        return cookie.getCookie('nuvann-valid-token');
    }
    
    isAuthenticated() {
        return !!this.getValidToken();
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
import cookie from "../cookie";

class SessionManager {
    
    setSession(value: any) {
       cookie.setCookie({
              name: '@nuvann:session',
              value,
              days: 1
         });
    }

    getValidToken() {
        return cookie.getCookie('@nuvann:valid-token');
    }
    
    isAuthenticated() {
        return !!this.getValidToken();
    }

}


const sessionManager = new SessionManager();
export default  sessionManager;
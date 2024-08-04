import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';

export function redirectToLogin() {
    const nonce = Math.random().toString(36);
    const state = Math.random().toString(36);

    console.log('nonce'.repeat(100));

    //use secure cookie in production
    Cookies.set('nonce', nonce);
    Cookies.set('state', state);

    const loginUrlParams = new URLSearchParams({
        nonce,
        state,
        redirect_uri: window.location.origin,
        client_id: "nuvann-store-bed60124-d06a-4c0f-9fe1-52a0612a4b1f",
        response_type: "token id_token",
        scope: "openid",
    });

   const url = `https://keycloak.mjcodegroup.com/realms/nuvann/protocol/openid-connect/auth?${loginUrlParams.toString()}`;

   window.location.href = url;
}

export function setTokens(accessToken: string, idToken: string, state: string) {
    const stateCookie = Cookies.get('state');
    const nonceCookie = Cookies.get('nonce');
    if (stateCookie !== state) {
      return redirectToLogin();
    }

    let decodedAccessToken = null;
    let decodedIdToken = null;
    try {
      decodedAccessToken = decodeJwt(accessToken);
      decodedIdToken = decodeJwt(idToken);
    } catch (e) {
      return redirectToLogin();
    }

    if (decodedAccessToken.nonce !== nonceCookie) {
      return redirectToLogin();
    }

    if (decodedIdToken.nonce !== nonceCookie) {
      return redirectToLogin();
    }

    Cookies.set('access_token', accessToken, 1);
    Cookies.set('id_token', idToken, 1);
    return decodedAccessToken;
  }

  export function getAccessToken() {
    const token = Cookies.get('access_token');
    if (!token) {
      return redirectToLogin();
    }
    return token;
  }

  export function getAuth() {
    const token = getAccessToken() as string;
    try {
      return decodeJwt(token);                     
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  export function logout() {
    const idToken = Cookies.get('id_token');
  
    if (!idToken) {
      return false;
    }
    const logoutParams = new URLSearchParams({
      //client_id: "fullcycle-client",
      id_token_hint: idToken as string,
      post_logout_redirect_uri: "http://localhost:3000",
    });
  
    Cookies.remove('access_token');
    Cookies.remove('id_token');
    Cookies.remove('nonce');
    Cookies.remove('state');
    
    const url = `https://keycloak.mjcodegroup.com/realms/nuvann/protocol/openid-connect/logout?${logoutParams}`;
    window.location.href = url;
  
    return true;
  }
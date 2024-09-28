import Cookies from "js-cookie";
import { decodeJwt } from "jose";


const keycloakUrl = "https://keycloak.mjcodegroup.com";

export function redirectToLogin() {
    const origin = window.location.origin;
  const nonce = Math.random().toString(36);
  const state = Math.random().toString(36);
  //lembrar armazenar com cookie seguro (https)
  Cookies.set("nonce", nonce);
  Cookies.set("state", state);

  const loginUrlParams = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string,
    redirect_uri: origin,
    response_type: "token id_token",
    nonce: nonce,
    state: state,
  });

  const url = `${keycloakUrl}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/auth?${loginUrlParams.toString()}`;
  window.location.href = url;
  
}

export function login(accessToken: string, idToken: string, state: string) {
  const stateCookie = Cookies.get("state");
  if (stateCookie !== state) {
    throw new Error("Invalid state");
  }

  let decodedAccessToken = null;
  let decodedIdToken = null;
  try {
    decodedAccessToken = decodeJwt(accessToken);
    decodedIdToken = decodeJwt(idToken);
  } catch (e) {
    throw new Error("Invalid token");
  }

  if (decodedAccessToken.nonce !== Cookies.get("nonce")) {
    throw new Error("Invalid nonce");
  }

  if (decodedIdToken.nonce !== Cookies.get("nonce")) {
    throw new Error("Invalid nonce");
  }

  Cookies.set("access_token", accessToken);
  Cookies.set("id_token", idToken);

  if (typeof window !== 'undefined') {
    window.history.pushState(null, '', '/');
  }

  return decodedAccessToken;
}

export function redirectToLogout() {
    const origin = window.location.origin;
  if (!Cookies.get("id_token")) {
    return false;
  }
  const logoutParams = new URLSearchParams({
    //client_id: "fullcycle-client",
    id_token_hint: Cookies.get("id_token") as string,
    post_logout_redirect_uri: `${origin}`,
  });

  Cookies.remove("access_token");
  Cookies.remove("id_token");
  Cookies.remove("nonce");
  Cookies.remove("state");

  

  const redirect = `${keycloakUrl}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/logout?${logoutParams.toString()}`;
  window.location.href = redirect;
}

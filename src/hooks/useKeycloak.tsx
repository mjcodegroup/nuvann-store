import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { createRemoteJWKSet, decodeJwt, jwtVerify } from "jose";
import { login } from '@/utils/keycloak.util';

export interface KeycloakContextType {
  authenticated: boolean;
  isLoading: boolean;
  user: any;
  getAuth: () => any;
}

const KeycloakContext = createContext<KeycloakContextType>({} as KeycloakContextType);

export function KeycloakProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  function getAuth() {
    setIsLoading(true);
    const token = Cookies.get("access_token");

    console.log("token", token);
  
    if (!token) {
      return null;
    }
    validateToken(token);
    try {
      return decodeJwt(token);
    } catch (e) {
      Cookies.remove("access_token");
      Cookies.remove("id_token");
      Cookies.remove("nonce");
      Cookies.remove("state");
    
      console.error(e);
      return null;
    }
  }

  async function validateToken(token: string) {
    const jwks = createRemoteJWKSet(new URL(`${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/certs`));

    try {
      const { payload, protectedHeader } = await jwtVerify(token, jwks);
      console.log("___________", payload);
    } catch (e) {
      Cookies.remove("access_token");
      Cookies.remove("id_token");
      Cookies.remove("nonce");
      Cookies.remove("state");
    
      console.log("error", e);
      return null;
    }
  }


  useEffect(() => {
    let hash = window.location.hash;


    if (hash) {
      hash = hash.replace('#', '');

      const params = new URLSearchParams(hash);

      const accessToken = params.get('access_token');
      const idToken = params.get('id_token');
      const state = params.get('state');

      if (accessToken && idToken && state) {
        login(accessToken, idToken, state);
      }
    }

    const authUser = getAuth();
    console.log("authUser", authUser);
    setUser(authUser);
    setAuthenticated(!!authUser);
    setIsLoading(false);
}, []);
  return (
    <KeycloakContext.Provider value={{ authenticated, isLoading, user, getAuth }}>
      {children}
    </KeycloakContext.Provider>
  );
}

export const useKeycloakContext = () => useContext(KeycloakContext);

import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { decodeJwt } from "jose";
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
  
    if (!token) {
      return null;
    }
  
    try {
      return decodeJwt(token);
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let hash = window.location.hash;

    console.log('hash', hash);

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

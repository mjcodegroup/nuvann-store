import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { createContext, useContext, useState, useEffect } from 'react';

export interface KeycloakContextType {
  keycloak: KeycloakInstance | null;
  authenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  user: any;
  handleLogin: () => void;
}

const KeycloakContext = createContext<KeycloakContextType>({} as KeycloakContextType);

export function KeycloakProvider({ children }: { children: React.ReactNode }) {
  const [keycloak, setKeycloak] = useState<KeycloakInstance | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAuthenticated = localStorage.getItem('authenticated');

    if (storedUser && storedAuthenticated === 'true') {
      setUser(JSON.parse(storedUser));
      setAuthenticated(true);
      setIsLoading(false);
    }

    const keycloakInstance = new Keycloak({
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string,
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string,
    });

    setKeycloak(keycloakInstance);
    keycloakInstance.init({
      onLoad: 'check-sso',
      checkLoginIframe: true,
      flow: 'hybrid',
      silentCheckSsoRedirectUri: window.location.origin + '/',
    }).then(authenticated => {
      if (authenticated) {
        const userProfile = keycloakInstance.tokenParsed;
        setUser(userProfile);
        setAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userProfile));
        localStorage.setItem('authenticated', 'true');
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('authenticated');
        setAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    }).catch(error => {
      console.error('Failed to initialize Keycloak:', error);
      setIsLoading(false);
    });
  }, []);

  const handleLogin = () => {
    if (keycloak) {
      keycloak.login();
    }
  };

  const logout = async () => {
    if (keycloak) {
      try {
        await keycloak.logout({ redirectUri: window.location.origin });
        setAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('authenticated');
      } catch (err) {
        console.error('Logout failed:', err);
      }
    }
  };

  return (
    <KeycloakContext.Provider value={{ keycloak, authenticated, isLoading, logout, user, handleLogin }}>
      {children}
    </KeycloakContext.Provider>
  );
}

export const useKeycloakContext = () => useContext(KeycloakContext);

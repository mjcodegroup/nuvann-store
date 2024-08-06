import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { useState } from 'react';

export const useKeycloak = () => {
  const [keycloak, setKeycloak] = useState<KeycloakInstance | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    if (!keycloak) {
      const keycloakInstance = new Keycloak({
        url: 'https://keycloak.mjcodegroup.com',
        realm: 'nuvann',
        clientId: 'nuvann-store-bed60124-d06a-4c0f-9fe1-52a0612a4b1f',
      });

      console.log("*".repeat(350));
      console.log('keycloakInstance', keycloakInstance);

      keycloakInstance.init({
        onLoad: 'login-required',
        flow: 'hybrid'
       })
      .then(authenticated => {
        setAuthenticated(authenticated);
        setKeycloak(keycloakInstance);

      })
      .catch(() => {
        setAuthenticated(false);
      });
     
    } else {
      try {
        await keycloak.login();
      } catch (err) {
        console.error('Login failed:', err);
      }
    }
  };

  const login = async () => {
    if (keycloak) {
      try {
        await keycloak.login();
      } catch (err) {
        console.error('Login failed:', err);
      }
    }
  };

  const logout = async () => {
    if (keycloak) {
      try {
        await keycloak.logout({
          redirectUri: window.location.origin,
        });
      } catch (err) {
        console.error('Login failed:', err);
      }
    }
  };

  return { keycloak, authenticated, login, isLoading, logout, user, handleLogin };
};

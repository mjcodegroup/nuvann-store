import keycloak from "@/libs/pkg/keycloak";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  token: "",
  user: {} as any,
  logout: () => {},
  login: () => {},
  handleLogin: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
const [token, setToken] = useState<string>("");
  const isRun = useRef(false);

  const getUserInfo = async (token:string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      setUser(data);
      setIsAuthenticated(true);
    } else {
      login();
    }
  };

  const login = async () => {
    if (isRun.current) return;
    isRun.current = true;
    keycloak
      ?.init({
        onLoad: "check-sso",
        checkLoginIframe: true,
        flow: 'hybrid',
        silentCheckSsoRedirectUri: window.location.origin + '/',
      })
      .then((res) => {
        setIsAuthenticated(res);
        setCookie("access_token", keycloak?.token);
        getUserInfo(keycloak?.token as string)
        
      });
    };

  const logout = useCallback(async () => {
    window.location.href =
      process.env.NEXT_PUBLIC_KEYCLOAK_URL +
      `/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/logout?post_logout_redirect_uri=${window.location.origin}&client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}`;
  }, []);

  const handleLogin = () => {
    if (keycloak) {
      keycloak.login();
    }
  };

  useEffect(() => {
    if (!getCookie("access_token")) {
      login();
    } else {
      setToken(getCookie("access_token") as string);
      getUserInfo(getCookie("access_token") as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        handleLogin,
        token,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
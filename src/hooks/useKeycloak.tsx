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
  loading: true
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const isRun = useRef(false);
  const [loading, setLoading] = useState<boolean>(true);


  const getUserInfo = useCallback(async (token: string) => {
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
      setCookie("user", JSON.stringify(data));
      setIsAuthenticated(true);
    } else {
      login();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async () => {
    if (isRun.current) return;
    isRun.current = true;
    setLoading(true);
    keycloak
      ?.init({
        onLoad: "check-sso",
        flow: 'hybrid',
      })
      .then((res) => {
        if (res) {
          const newToken = keycloak?.token;
          setIsAuthenticated(true);
          setToken(newToken as string);
          setCookie("access_token", newToken);
          getUserInfo(newToken as string);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [getUserInfo]);

  const logout = useCallback(async () => {
    deleteCookie('access_token');
    deleteCookie('user');
    window.location.href =
      process.env.NEXT_PUBLIC_KEYCLOAK_URL +
      `/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/logout?post_logout_redirect_uri=${window.location.origin}&client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}`;
  }, []);

  const handleLogin = () => {
    if (keycloak) {
      keycloak.login();
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = getCookie("access_token");

    if (token) {
      setToken(token as string);
      getUserInfo(token as string);
    } else {
      login();
    }
    setLoading(false);
  }, [login, getUserInfo]);

  return (
    <AuthContext.Provider
      value={{
        loading,
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

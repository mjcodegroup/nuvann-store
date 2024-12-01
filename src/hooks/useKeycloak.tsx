// import keycloak from "@/libs/pkg/keycloak";
// import { deleteCookie, getCookie, setCookie } from "cookies-next";
// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import Token from "@/utils/token";

// const AuthContext = createContext({
//   isAuthenticated: false,
//   token: "",
//   user: {} as any,
//   logout: () => {},
//   login: () => {},
//   handleLogin: () => {},
//   loading: true
// });

// export const AuthProvider = ({ children }: any) => {
//   const [user, setUser] = useState<any>(undefined);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [token, setToken] = useState<string>("");
//   const isRun = useRef(false);
//   const [loading, setLoading] = useState<boolean>(true);

  
  
//   const getUserInfo = useCallback(async (token: string) => {
//     const user = Token.decodeToken(token);
//     // const res = await fetch(
//     //   `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
//     //   {
//     //     method: "GET",
//     //     headers: {
//     //       Authorization: `Bearer ${token}`,
//     //     },
//     //   }
//     // );
    
//     if (user) {
//       setUser(user);
//       setCookie( "user", JSON.stringify(user));
//       setIsAuthenticated(true);
//     } else {
//       login();
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
  

//   const login = useCallback(async () => {
//     if (isRun.current) return;
//     isRun.current = true;
//     setLoading(true);
//     keycloak
//       ?.init({
//         onLoad: "check-sso",
//         flow: 'hybrid',
//         redirectUri: window.location.origin,
//       })
//       .then((res) => {
//         if (res) {
//           const newToken = keycloak?.token;
//           setIsAuthenticated(true);
//           setToken(newToken as string);
//           setCookie("access_token", newToken);
//           getUserInfo(newToken as string);
//         }
//       })
//       .finally(() => {
//         setLoading(false);
//       })
//   }, [getUserInfo]);

//   const logout = useCallback(async () => {
//     deleteCookie('access_token');
//     deleteCookie('user');
//     window.location.href =
//       process.env.NEXT_PUBLIC_KEYCLOAK_URL +
//       `/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/logout?post_logout_redirect_uri=${window.location.origin}&client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}`;
//   }, []);

//   const handleLogin = () => {
//     if (keycloak) {
//       keycloak.login();
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     const token = getCookie("KEYCLOAK_SESSION");
//     if (token) {
//       setToken(token as string);
//       getUserInfo(token as string);
//     } 
//     else {
//       login();
//     }
//     setLoading(false);
//   }, [login, getUserInfo]);

//   return (
//     <AuthContext.Provider
//       value={{
//         loading,
//         isAuthenticated,
//         user,
//         handleLogin,
//         token,
//         logout,
//         login,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

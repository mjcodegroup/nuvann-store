

// class KeycloakService {
//     keycloak: Keycloak.KeycloakInstance;
//     constructor(keycloak: Keycloak.KeycloakInstance) {
//         this.keycloak = keycloak;
       
//     }

//     init() {
//       this.keycloak.init({
//         onLoad: 'login-required',
//         flow: 'hybrid',
//       }).then((authenticated) => {
//         if (authenticated) {
//           console.log('authenticated');
//         } else {
//           console.log('not authenticated');
//         }
//       })
//     }

//     isAuthenticated() {
//         return this.keycloak.authenticated || false;
//     }


//     getInstance(): Keycloak.KeycloakInstance {
//         return this.keycloak;
//     }

//     getToken() {
//         return this.keycloak?.token || '';
//     }

//     login() {
//       this.init();
//     //   this.keycloak?.login({
//     //     redirectUri: window.location.origin,
//     //   });
//     }

//     logout() {
//     }
// }

// // eslint-disable-next-line import/no-anonymous-default-export
// export default KeycloakService;
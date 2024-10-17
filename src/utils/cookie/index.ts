class Cookie {
     setCookie(
        name: string, 
        value: string, 
        domain?: string 
      ) {
          let date = new Date();
          date.setTime(date.getTime() + (30 * 60 * 1000));
          let expires = "; expires=" + date.toUTCString();
      
          let cookieString = `${name}=${value || ""}${expires}; path=/; HttpOnly; Secure; SameSite=Strict`;
      
          if (domain) {
              cookieString += `; Domain=${domain}`;
          }
      
          document.cookie = cookieString;
    }
      
      
      

    getCookie(name: string) {
        if (typeof window !== 'undefined') {
            const cookieValue = RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)').exec(document.cookie);
            return cookieValue ? cookieValue.pop() : '';
        } else {
            return '';
        }
    }

    deleteCookie(name: string) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default  new Cookie();

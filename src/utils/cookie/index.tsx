import Cookies from 'js-cookie';

class Cookie {
  setCookie({name, value, days, domain}:{name: string, value: string, days: number, domain: string}) {
    if (typeof window !== 'undefined') {
      Cookies.set(name, value, { 
        expires: days, 
        path: '/', 
        domain: domain, 
        secure: true
      });
    }
  }

  getCookie(name: string) {
    if (typeof window !== 'undefined') {
      return Cookies.get(name) || '';
    } else {
      return '';
    }
  }

  deleteCookie(name: string, domain?: string) {
    if (typeof window !== 'undefined') {
      Cookies.remove(name, { 
        path: '/', 
        domain: domain || process.env.NEXT_PUBLIC_COOKIE_DOMAIN, 
        secure: true 
      });
    }
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default  new Cookie();

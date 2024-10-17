class Cookie {
  setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
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

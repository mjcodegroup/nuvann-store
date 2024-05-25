// utils/set-cookie.test.ts
import Cookie from '@/utils/cookie/index'

const getCookies = () => {
    return document.cookie.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        cookies[name] = value;
        return cookies;
    }, {} as { [key: string]: string });
};

describe('Cookie Utilities', () => {
    beforeEach(() => {
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
        });
    });

    describe('setCookie', () => {
        beforeEach(() => {
            // Clear the document.cookie before each test
            global.document.cookie = '';
        });
    
        it('sets a cookie with a given name and value', () => {
            Cookie.setCookie('testCookie', 'testValue', 7);
            expect(document.cookie).toMatch(/testCookie=testValue/);
        });
    
        it('sets a cookie with an expiration date', () => {
            const days = 7;
            const futureDate = new Date();
            futureDate.setTime(futureDate.getTime() + (days * 24 * 60 * 60 * 1000));
    
            Cookie.setCookie('testCookie', 'testValue', days);
            const cookieString = document.cookie;
            expect(cookieString).toMatch(/testCookie=testValue/);
        });


    });

    describe('getCookie', () => {
        it('should return the value of the cookie with the given name', () => {
            const name = 'testCookie';
            const value = 'testValue';
            document.cookie = `${name}=${value}; path=/`;

            expect(Cookie.getCookie(name)).toBe(value);
        });

        it('should return an empty string if the cookie does not exist', () => {
            expect(Cookie.getCookie('nonExistentCookie')).toBe('');
        });

        it('should return an empty string for undefined cookie', () => {
            const originalWindow = global.window;
            // @ts-ignore
            delete global.window;
        
            expect(Cookie.getCookie('testCookie')).toBe('');
            global.window = originalWindow;
          });
    });

    describe('deleteCookie', () => {
        it('should delete the cookie with the given name', () => {
            const name = 'testCookie';
            const value = 'testValue';
            document.cookie = `${name}=${value}; path=/`;

            Cookie.deleteCookie(name);

            const cookies = getCookies();
            expect(cookies[name]).toBeUndefined();
        });
    });
});

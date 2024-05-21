// utils/set-cookie.test.ts
import {getCookie,setCookie} from '@/utils/cookie/index'

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
        it('should set a cookie with the given name, value and expiry days', () => {
            const name = 'testCookie';
            const value = 'testValue';
            const days = 7;

            setCookie(name, value, days);

            const cookies = getCookies();
            expect(cookies[name]).toBe(value);
        });

        it('should set a session cookie if days is not provided', () => {
            const name = 'sessionCookie';
            const value = 'sessionValue';

            setCookie(name, value, 0);

            const cookies = getCookies();
            expect(cookies[name]).toBe(value);
        });
    });

    describe('getCookie', () => {
        it('should return the value of the cookie with the given name', () => {
            const name = 'testCookie';
            const value = 'testValue';
            document.cookie = `${name}=${value}; path=/`;

            expect(getCookie(name)).toBe(value);
        });

        it('should return an empty string if the cookie does not exist', () => {
            expect(getCookie('nonExistentCookie')).toBe('');
        });

        it('should return an empty string for undefined cookie', () => {
            const originalWindow = global.window;
            // @ts-ignore
            delete global.window;
        
            expect(getCookie('testCookie')).toBe('');
            global.window = originalWindow;
          });
    });
});

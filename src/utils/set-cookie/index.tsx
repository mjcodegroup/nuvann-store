export default function setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: string) {
    if (typeof window !== 'undefined') {
        const cookieValue = RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)').exec(document.cookie);
        return cookieValue ? cookieValue.pop() : '';
    } else {
        // Tratar caso em que window não está definido (por exemplo, em ambiente Node.js)
        return '';
    }
}
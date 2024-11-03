
export function formatDate(receivedDate: string, language: string): string {
    const date = new Date(receivedDate);


    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };

    return date.toLocaleString(language, options);
}

export function getYearFromDate(receivedDate: string): string {
    const date = new Date(receivedDate);
    return date.getFullYear().toString();
}

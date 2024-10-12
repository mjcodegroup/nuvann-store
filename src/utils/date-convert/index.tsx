export function formatDate(receivedDate: string): string {
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

    return date.toLocaleString('en-US', options);
}
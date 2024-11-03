import { useTranslation } from "react-i18next";

export function formatDate(receivedDate: string): string {
    const date = new Date(receivedDate);
    const { t } = useTranslation('language');


    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };

    return date.toLocaleString(t('date_format'), options);
}

export function getYearFromDate(receivedDate: string): string {
    const date = new Date(receivedDate);
    return date.getFullYear().toString();
}

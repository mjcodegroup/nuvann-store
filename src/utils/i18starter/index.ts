import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import Backend from 'i18next-http-backend'
import Cookie from "../cookie";

const language = Cookie.getCookie('NEXT_I18LANG');
i18next
    .use(initReactI18next)
    .use(Backend)
    .init({
        lng: language,
        fallbackLng: "fr",
        backend: {
            loadPath: '/translations/{{lng}}/translations.json'
        },
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false,
        },
        defaultNS: 'common',
    })

export default i18next;
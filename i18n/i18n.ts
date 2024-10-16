import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import cookie from "@/utils/cookie";
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import ht from './locales/ht.json';

const language = String(cookie.getCookie('NEXT_I18LANG'));
i18n
    .use(initReactI18next)
    .init({
        lng: language,
        fallbackLng: "fr",
        defaultNS: [
            "home",
            "nav_content",
            "placeholders",
            "buttons",
            "details",
            "cart", 
            "checkout",
        ],
        resources: {
            en,
            fr,
            es,
            ht
        }
    })

export default i18n;
import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import Backend from 'i18next-http-backend'
import { getCookie } from "../set-cookie";

i18next
    .use(initReactI18next)
    .use(Backend)
    .init({
        lng: getCookie("NEXT_I18LANG"),
        fallbackLng: "en",
        backend: {
            loadPath: '/translations/{{lng}}/translations.json'
        }
    })
export default i18next;
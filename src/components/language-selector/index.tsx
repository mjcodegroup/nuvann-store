import setCookie, { getCookie } from '@/utils/set-cookie';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { ActiveLngDataTypes } from './type';

export default function LanguageSelector() {

    const { i18n } = useTranslation('en', { useSuspense: false });

    const handleLangChange = (event:any): void => {
        const lang = event.target.value
        i18n.changeLanguage(lang)
        setCookie("NEXT_I18LANG", lang, 180)
    }
    const i18activeLng: ActiveLngDataTypes[] = [
        {name: "EN", value: "en"},
        {name: "FR", value: "fr"},
        {name: "ES", value: "es"},
    ]
  return (
        <div className="pl-10 inline-flex">
            <select className="p-2" onChange={handleLangChange} value={getCookie("NEXT_I18LANG") ?? i18n.language}>
                {i18activeLng.map(_lng => (
                    <option
                        defaultValue={i18n.language}
                        key={_lng.value}
                        value={_lng.value}
                    >
                        {_lng.name}
                    </option>
                ))}
            </select>
        </div>
  )
}

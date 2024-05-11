import setCookie, { getCookie } from '@/utils/set-cookie';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import activeLanguage from '@/utils/mocks/active-language';
import { FormControl, MenuItem, Select } from '@mui/material';
import Image from 'next/image';

export default function LanguageSelector() {
    const cookieLng = getCookie("NEXT_I18LANG");
    const [lng, setLng] = useState<string>('fr')
    const { i18n } = useTranslation(cookieLng, { useSuspense: false });

    const handleLangChange = (event: any): void =>  {
        const lang = event.target.value
        i18n.changeLanguage(lang)
        setLng(lang)
        setCookie("NEXT_I18LANG", lang, 180)
    }

    useEffect(() => {
      setLng(i18n.language)
    }, [i18n.language])
    
  return (
    <FormControl sx={{Width: 30, minHeight: 20}} size="small">
        <Select
            variant='filled'
            id="demo-simple-select-filled"
            value={lng}
            onChange={handleLangChange}
        >
        {activeLanguage.map(_lng => (
            <MenuItem sx={{
                display: 'flex',
                gap: '0 16px',
                fontSize: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center'
            }} key={_lng.value} value={_lng.value}>
                <Image src={_lng.image} alt={_lng.name} width={20} height={12}/>
                <span style={{fontSize: '14px', marginLeft: '8px'}}>
                    {_lng.name}
                </span>
                </MenuItem>
        ))}
        </Select>
    </FormControl>
  )
}

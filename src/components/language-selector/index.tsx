import Cookie from '@/utils/cookie/index';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import activeLanguage from '@/utils/mocks/active-language';
import { FormControl, MenuItem, Select } from '@mui/material';
import Image from 'next/image';

export default function LanguageSelector() {
    const [lng, setLng] = useState<string>(process.env.NEXT_I18LANG || 'fr')
    const { i18n } = useTranslation();

    const handleLangChange = (event: any): void =>  {
        const lang = event.target.value
        i18n.changeLanguage(lang)
        setLng(lang)
        Cookie.setCookie({
            name: 'NEXT_I18LANG',
            value: lang,
            days: 180
        })
        window.location.reload()
    }

    useEffect(() => {
      setLng(i18n.language)
    }, [i18n.language])
    
  return (
    <FormControl sx={{borderBottom: 'none'}}>
        <Select
            variant='standard'
            value={lng}
            onChange={handleLangChange}
            sx={{
                borderBottom: 'none'
            }}
        >
        {activeLanguage.map(_lng => (
            <MenuItem sx={{
                display: 'flex',
                gap: '0 16px',
                fontSize: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                overflow: 'hidden'
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

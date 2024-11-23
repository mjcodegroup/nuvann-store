import React from 'react'
import { useTranslation } from 'react-i18next'

interface FreeShippingTextProps {
    text: string
}

export default function FreeShippingText(props: FreeShippingTextProps) {
    const { t} = useTranslation('common')
  return (
    <>
        {
            props.text === 'free_text' ? <small style={{
              color: '#00A650',
            }}>{t('free_text')}</small> : <>{props.text} </>
                
        }
    </>
  )
}

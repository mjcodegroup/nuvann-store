import React, { use } from 'react'
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineLogout } from 'react-icons/ai';
import {FaMapMarkerAlt, FaPhoneAlt, FaEnvelope} from 'react-icons/fa';
import Image from 'next/image';
import styles from './styles.module.scss'

import visaIcon from '../../../public/assets/cards/visa.svg'
import masterCard from '../../../public/assets/cards/mastercard.svg'
import paypal from '../../../public/assets/cards/paypal.svg'
import elo from '../../../public/assets/cards/elo.svg'
import visacheckout from '../../../public/assets/cards/visacheckout.svg'
import amex from '../../../public/assets/cards/amex.svg'
import boleto from '../../../public/assets/cards/boleto.svg'
import pack from '../../.../../../package.json';
import { useTranslation } from 'react-i18next';
import { FcShipped } from 'react-icons/fc';
import Link from 'next/link';
import getDeviceType from '@/utils/get-device-type';

export const Footer = () => {
  const { t } = useTranslation('footer')

  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className={styles.footer_principal_container}>
        <div className={styles.footer_details}>
          <div style={{
            width:  getDeviceType.isMobile() ? '100%': '30%',
          }}>
            <h2>NUVANN</h2>
            <p>{t('about_us_text')}</p>
          </div>
          <div>
            <h2>{t('utils_Links')}</h2>
            <Link href="https://faqs.nuvann.com/en/demarrage-rapid" target='_blank'><p>Nuvann</p></Link>
            <Link href="https://faqs.nuvann.com/en/home" target='_blank'><p>{t('faq')}</p></Link>
            <Link href="https://faqs.nuvann.com/en/vendre" target='_blank'><p>{t('how_to_sell')}</p></Link>
            <Link href="https://faqs.nuvann.com/en/termes-et-conditions" target='_blank'><p>{t('terms_and_conditions')}</p></Link>
          </div>

          <div style={{
            width:  getDeviceType.isMobile() ? '100%': '30%',
          }}>
            <h2>{t('payment_Methods')}</h2>
            <div className={styles.footer_principal_cards}>
              <Image src={visaIcon} alt={visaIcon}/>
              <Image src={masterCard} alt={masterCard}/>
              <Image src={paypal} alt={paypal}/>
              <Image src={elo} alt={elo}/>
              <Image src={visacheckout} alt={visacheckout}/>
              <Image src={amex} alt={amex}/>
              <Image src={boleto} alt={boleto}/>
            </div>
          </div>
          <div>
            <h2>{t('client_space')}</h2>
            <Link href="/carts"><p><span><AiOutlineShoppingCart/></span> {t('carts')}</p></Link>
            <Link href="/orders"><p><span> <FcShipped /> </span> {t('orders')}</p></Link>
          </div>
        </div>
        <div className={styles.footer_signature}>
            <span>© {year} - Nuvann-Store | All rights reserved. © {pack?.version}</span>
            <span>{t('country_region')}: {process.env.NEXT_PUBLIC_COUNTRY_REGION}</span>
        </div>
    </div>
  )
}
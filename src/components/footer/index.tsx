import React from 'react'
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

export const Footer = () => {

  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className={styles.footer_principal_container}>
        <div className={styles.footer_details}>
          <div>
            <h2>Kontakte nou</h2>

            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            </p> <br />

            <p><span> <FaMapMarkerAlt color='#000052'/> </span>Rua Inambu 540, Efapi-Chapeco, SC </p>
            <p><span> <FaPhoneAlt color='#000052'/> </span>+55-0000000000</p>
            <p><span> <FaEnvelope color='#000052'/> </span> nuvann@contact.com</p>
          </div>
          <div>
            <h2>Rakousi Enfo</h2>

            <p>Komanw kapab Vann </p>
            <p> Komanw ka fè yon reklamasyon </p>
            <p> Komanw ka pab Vann </p>
            <p> Komanw ka fè yon reklamasyon  </p>
          </div>

          <div>
            <h2>Metòd Pèman</h2>
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
            <h2>Espas Kliyan</h2>
            <p><span><AiOutlineUser/></span> Profil</p>
            <p><span><AiOutlineShoppingCart/></span> Panye</p>
            <p><span> <AiOutlineLogout /> </span> Dekonekte</p>
          </div>
        </div>
        <div className={styles.footer_signature}>
            <span>© {year} - Nuvann-Store | All rights reserved. © {pack?.version}</span>
            <span>Country & Regionn: USA | Canada | Brazil | Chile | Haiti        </span>
        </div>
    </div>
  )
}
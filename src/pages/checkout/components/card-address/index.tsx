import React from 'react';
import Styles from "./card-address.module.scss"
import CustomButton from '@/components/custom-button';
import { useTranslation } from 'react-i18next';
import { RiMapPin2Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { CardAddressProps } from '../../types';

export default function CardAddress(props: CardAddressProps) {
  const { t } = useTranslation("checkout");
  const { user } = props;
  return (
    <div className={Styles.address_wrapper}>
        <h4><RiMapPin2Line /> {t("checkout.delivery_address")}</h4>
        <div className={Styles._content}>
          {
            user.address && (
              <div className={Styles._infos}>
                  <span><h4>{user.name} {user.phone_number}</h4></span>
                  <span>{user?.address?.street}</span>
                  <span>{user.address?.number}</span>
                  <span>{user.address?.neighborhood}</span>
                  <span>{user.address?.city}</span>
                  <span>{user.address?.state_or_department}</span>
                  <span>{user.address?.country.name}</span>
                  <span>{user.address?.zipCode}</span>
              </div>
            )
          }
            <div className={Styles._address_footer} style={{
              width: !user.address ? '100%' : 'auto'
            }}>{
                user.address ? (
                  <CustomButton
                  variant='text'
                  onClick={props.onChangeAddress}
                  >
                    {t("checkout.btn_to_replace_address")}
                  </CustomButton>

                ) : (
                  <CustomButton
                  startIcon={<IoMdAdd />}
                  onClick={props.onAddAddress}
                  >
                    {t("checkout.btn_add_address")}
                  </CustomButton>
                )
              
              }
            </div>
    </div>
    </div>
  )
}

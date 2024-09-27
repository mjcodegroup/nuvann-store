import React, { useState } from 'react';
import Styles from "./card-address.module.scss"
import CustomButton from '@/components/custom-button';
import { useTranslation } from 'react-i18next';
import { RiMapPin2Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { CardAddressProps } from '../../types';
import ModalActions from '@/components/modal-actions';
import CustomValidateInput from '@/components/custom-validate-input';
import CustomValidateSelect from '@/components/custom-validate-select';
import { formatCountriesArray } from '@/utils/format-countries-array';

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
                  <span className={Styles.first_line}>{user.shipping_contact?.name} - {user.shipping_contact?.phoneNumber}</span>
                  <span>{user?.address?.street},</span>
                  <span>{user.address?.number},</span>
                  <span>{user.address?.neighborhood},</span>
                  <span>{user.address?.city},</span>
                  <span>{user.address?.state_or_department},</span>
                  <span>{user.address?.country.name},</span>
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
                  onClick={()=>props.setOpenModalAddress(true)}
                  >
                    {t("checkout.btn_to_replace_address")}
                  </CustomButton>

                ) : (
                  <CustomButton
                  startIcon={<IoMdAdd />}
                  onClick={()=>props.setOpenModalAddress(true)}
                  >
                    {t("checkout.btn_add_address")}
                  </CustomButton>
                )
              
              }
            </div>
        </div>

        <ModalActions
          title={t(user.address ?'checkout.edit_address':'checkout.new_address')}
          open ={props.openModalAddress}
          setOpen= {props.setOpenModalAddress}
          disable={props.disableModalAddressButton}
          onClickBtnConfirm= {props.onConfirmModalAddress}
          loading={props.updateShippingInfoLoading}
        >

          <CustomValidateSelect
          defaultValue={{ code: user?.address?.country?.code, name: user?.address?.country?.name as string }}
           options={formatCountriesArray(props.countryList)}
           title={t('checkout.countries')}
           onSelect={(value) => props.setValues('country', value)}
           name="country"
           error={props.shipmentformErrors?.country?.code?.message || props.shipmentformErrors?.country?.name?.message}
           />

          <CustomValidateInput
            required
            type="text"
            label={t('checkout.full_name')}  
            {...props.shipmentAddress('name')}
            error={props.shipmentformErrors.name?.message}
          />

            <CustomValidateInput
              required
              label={t('checkout.phone_number')}
              {...props.shipmentAddress('phoneNumber')}
              error={props.shipmentformErrors.phoneNumber?.message}
            />

          <div style={{width: '60%'}}>
            <CustomValidateInput
              required
              label={t('checkout.postal_code')}
              {...props.shipmentAddress('zipCode')}
              error={props.shipmentformErrors.zipCode?.message}
            />
            </div>

            <CustomValidateInput
              label={t('checkout.state_department_province')}
              {...props.shipmentAddress('state_or_department', { required: 'Field is required' })}
              error={props.shipmentformErrors.state_or_department?.message}
            />

            <CustomValidateInput
              label={t('checkout.city')}
              {...props.shipmentAddress('city', { required: 'city is required' })}
              error={props.shipmentformErrors.city?.message}
            />

            <CustomValidateInput
              label={t('checkout.neighborhood')}
              {...props.shipmentAddress('neighborhood')}
              error={props.shipmentformErrors.neighborhood?.message}
            />

            <CustomValidateInput
              label={t('checkout.street_name')}
              {...props.shipmentAddress('street')}
              error={props.shipmentformErrors.street?.message}
            />
            <div style={{
              width: '60%',
            }}>
              <CustomValidateInput
                width="50%"
                  label={t('checkout.street_number')}
                  {...props.shipmentAddress('number')}
                  error={props.shipmentformErrors.number?.message}
                />
            </div>
            <CustomValidateInput
            label={t('checkout.complement')}
            {...props.shipmentAddress('complement')}
            error={props.shipmentformErrors.complement?.message}
            />
        </ModalActions>
    </div>
  )
}

import React from 'react'
import { HomePageDefault } from '@/components/home-page-default'
import { SubmitHandler, useForm } from 'react-hook-form';
import Checkout from '../view/checkout.view'
import { useCheckoutInfo } from '@/hooks/use-checkout-info';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserInfo } from '@/hooks/use-user-info';
import { z } from 'zod';
import { useCountriesInfo } from '@/hooks/use-countries-info';

type FormValues = {
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    zipCode: string,
    country: {
      code: string,
      name: string
    },
    state_or_department: string
    name: string,
    phoneNumber: string
}

const schema = z.object({
  country: z.object({
    code: z.string().min(1, "Country is required"), // Validação Zod
    name: z.string().min(1,"Option label is required"),
   }),
  name: z
  .string().min(1, "Name is required"),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(/^[0-9]*$/, "Phone must be a number") // Garante que seja um número
    .transform((val) => parseInt(val)),
  zipCode: z.string().min(1, "Zip code is required").regex(/^[0-9]*$/, "Zip code must be a number"),
  state_or_department: z.string().min(1, "State or department is required"),
  city: z.string().min(1, "City is required"),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  street: z.string().min(1, "Street is required"),
  number: z.string().min(1, "Number is required").regex(/^[0-9]*$/, "Must be a number"),
  complement: z.string().optional()

});

export default function CheckoutController() {
  const { checkout, updateShippingInfoLoading, updateShippingInfo, openModalAddress, setOpenModalAddress } = useCheckoutInfo();
  const {user} = useUserInfo();
  const {countries} = useCountriesInfo();

  const { register:shipmentAddress, setValue,  reset, handleSubmit, formState: { errors,isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  const handleConfirmModalAddress:SubmitHandler<FormValues> = (data: any) => {
    updateShippingInfo({
      shipping_address: {
        city: data.city,
        complement: data.complement,
        country: data.country,
        zipCode: data.zipCode,
        neighborhood: data.neighborhood,
        number: data.number,
        state_or_department: data.state_or_department,
        street: data.street,
      },
      shipping_contact: {
        name: data.name,
        phoneNumber: data.phoneNumber
      }
    });
  }

  React.useEffect(() => {
    reset({
      street: user?.address?.street || '',
      number: user?.address?.number || '',
      complement: user?.address?.complement || '',
      neighborhood: user?.address?.neighborhood || '',
      city: user?.address?.city || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country,
      state_or_department: user?.address?.state_or_department || '',
      name: user?.shipping_contact.name || '',
      phoneNumber: user.shipping_contact.phoneNumber || ''
    });
  }, [user, reset]);

  React.useEffect(() => {
    if (openModalAddress) {
      reset();
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [openModalAddress]);

  return (
    <HomePageDefault>
        <Checkout 
          orderItems={checkout.items}
          userInfos={user}
          countryList={countries}
          orderResume={{
            count: checkout.count,
            sub_total: checkout.sub_total,
            shipping_cost: checkout.shipping_cost,
            total: checkout.total
          }}
          shipmentAddress={shipmentAddress}
          openModalAddress={openModalAddress}
          setOpenModalAddress={setOpenModalAddress}
          disableModalAddressButton={!isValid}
          onConfirmModalAddress={handleSubmit(handleConfirmModalAddress)}
          shipmentformErrors={errors}
          setValues={setValue}
          updateShippingInfoLoading={updateShippingInfoLoading}
          
        />
    </HomePageDefault>
  )
}

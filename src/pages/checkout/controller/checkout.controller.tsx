import React from 'react'
import { HomePageDefault } from '@/components/home-page-default'
import { SubmitHandler, useForm } from 'react-hook-form';
import Checkout from '../view/checkout.view'
import { useCheckoutInfo } from '@/hooks/use-checkout-info';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserInfo } from '@/hooks/use-user-info';
import { z } from 'zod';

type FormValues = {
  name: string;
  phone: number;
}

const schema = z.object({
  name: z.string().min(1, "Name is required"),
phone: z
  .string()
  .min(1, "Phone is required")
  .regex(/^[0-9]*$/, "Phone must be a number") // Garante que seja um número
  .transform((val) => parseInt(val)),
   selectedCountry: z.object({
    value: z.string().min(1, "Option is required"), // Validação Zod
    label: z.string().min(1,"Option label is required"),
   })
});

export default function CheckoutController() {
  const { checkout } = useCheckoutInfo();
  const {user} = useUserInfo();

  const { register:shipmentAddress, setValue, watch, handleSubmit, formState: { errors,isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange", 
  });

  const [openModalAddress, setOpenModalAddress] = React.useState(false);

  const handleConfirmModalAddress:SubmitHandler<FormValues> = data => {
    console.log('Address confirmed', data);
    console.log(errors);
  }

  console.log(isValid);

  return (
    <HomePageDefault>
        <Checkout 
          orderItems={checkout.items}
          userInfos={user}
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
          
        />
    </HomePageDefault>
  )
}

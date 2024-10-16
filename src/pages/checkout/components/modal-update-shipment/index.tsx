import ModalActions from '@/components/modal-actions'
import React from 'react'
import { CardUpdateShipmentProps } from '../../types';
import { useTranslation } from 'react-i18next';
import ShipmentInfos from '@/pages/product/[id]/components/shipment-infos';

export default function ModalUpdateShipment(props: CardUpdateShipmentProps) {
    const { t } = useTranslation("checkout");
  return (
    <ModalActions
    title={t('select_shipment_option_title')}
    open ={props.openModalShipment}
    setOpen= {props.setOpenModalShipment}
    disable={props.disableModalShipmentButton}
    onClickBtnConfirm= {props.onConfirmModalShipment}
    loading={props.updateShippingInfoLoading}
    >
      <ShipmentInfos shippingInfos={props.item?.available_shipments} onInfoSelect={props.onhangeShippmentInfos} />
    </ModalActions>
  )
}

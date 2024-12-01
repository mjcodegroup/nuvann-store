import React from 'react';

import Modal from '@mui/material/Modal';
import { border, padding } from '@mui/system';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import CustomButton from '../custom-button';

import Styles from "./modal-confirm.module.scss"
import getDeviceType from '@/utils/get-device-type';
import { useTranslation } from 'react-i18next';

interface ModalConfirmProps {
    title?: string;
    description?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    textBtnConfirm?:string;
    widthBtnConfirm?: string;
    textBtnCancel?: string;
    widthBtnCancel?: string;
    onClickBtnConfirm?(): void;
    onCLickBtnCancel?(): void;
    size?:number;
    loading?:boolean;
}

export const ModalConfirm: React.FC<ModalConfirmProps> =({ 
    title,
    description,
    open,
    setOpen,
    textBtnConfirm = 'Konfime',
    widthBtnConfirm = "150px",
    textBtnCancel = "Anile",
    widthBtnCancel = "150px",
    onClickBtnConfirm,
    onCLickBtnCancel,
    size = getDeviceType.isMobile() ? 400 : 500,
    loading = false,
}) => {

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div className={Styles.simple_modal_container} style={{
            position: 'absolute',
            top: '50%',
            left:'50%',
            transform: 'translate(-50%, -50%)',
            width: size,
            backgroundColor: '#f5f5f5',
            borderRadius: '5px',
            textAlign: 'center',
            verticalAlign: 'center',
            border: '1px solid #BEBEBE',
            boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
            padding: '20px 16px 16px'

        }}>

            <div className={Styles.simple_modal_content}>
                <h2 id="simple-modal-title" className={Styles.title}> {title}<AiOutlineQuestionCircle color='#f50057'/></h2>
                <p id="simple-modal-description" className={Styles.description}>{description}</p>
            </div>
            <div className={Styles.simple_modal_buttons}>
                <CustomButton 
                    type='button' 
                    variant='outlined'
                    color='secondary'
                    width={widthBtnCancel}
                    onClick={() => {
                        setOpen(false);
                        onCLickBtnCancel && onCLickBtnCancel() //to verify
                    }}
                >
                {textBtnCancel}

                </CustomButton>

                <CustomButton
                    type="button"
                    color='primary'
                    backgroundColor='#000052'
                    width={widthBtnConfirm}
                    onClick={() => {
                        onClickBtnConfirm && onClickBtnConfirm() //to verify
                    }}
                    isLoading= {loading}
                >
                    {textBtnConfirm}
                </CustomButton>

            </div>
        </div>
    )
  return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        autoFocus={false}
        disableEnforceFocus
        disableAutoFocus
        disableRestoreFocus
        style={{
            outline: 'none', // Remove outline from Modal
            border: 'none', // Prevent border styling
        }}
        >
            {body}
        </Modal>
  )
}

export default ModalConfirm;
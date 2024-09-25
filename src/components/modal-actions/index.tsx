import React from 'react';
import Modal from '@mui/material/Modal';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import CustomButton from '../custom-button';
import Styles from './modal-actions.module.scss';
import { useTranslation } from 'react-i18next';

interface CustomModalProps {
    title: string; 
    open: boolean;
    setOpen?: any;
    textBtnConfirm?: string;
    widthBtnConfirm?: string;
    textBtnCancel?: string;
    widthBtnCancel?: string;
    onClickBtnConfirm?(): void;
    onClickBtnCancel?(): void;
    size?: number;
    loading?: boolean;
    children: React.ReactNode;
    disable?: boolean;
}

export const ModalActions: React.FC<CustomModalProps> = ({
    title,
    open,
    setOpen,
    textBtnConfirm,
    widthBtnConfirm = '150px',
    textBtnCancel,
    widthBtnCancel = '150px',
    onClickBtnConfirm,
    onClickBtnCancel,
    size = 600,
    loading = false,
    children,
    disable = false,
}) => {
    const { t } = useTranslation('buttons');

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
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
                <div
                    className={Styles.__modal_container}
                    style={{
                        outline: 'none', // Ensure no outline on modal content
                        border: 'none',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: size,
                        backgroundColor: '#f5f5f5',
                        borderRadius: '5px',
                        textAlign: 'center',
                        verticalAlign: 'center',
                        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                        padding: '20px 16px 16px',
                    }}
                >
                    <h2 id="__modal-title" className={Styles.title}>
                        {title} <AiOutlineQuestionCircle color="#f50057" />
                    </h2>
                    <div className={Styles.__description}>{children}</div>
                    <div className={Styles.simple_modal_buttons}>
                        <CustomButton
                            type="button"
                            variant="outlined"
                            color="secondary"
                            width={widthBtnCancel}
                            onClick={() => {
                                setOpen(false);
                                onClickBtnCancel && onClickBtnCancel();
                            }}
                        >
                            {textBtnCancel || t('buttons.cancel')}
                        </CustomButton>

                        <CustomButton
                            disabled={disable}
                            type="button"
                            color="primary"
                            backgroundColor="#000052"
                            width={widthBtnConfirm}
                            onClick={() => {
                                onClickBtnConfirm && onClickBtnConfirm();
                            }}
                            isLoading={loading}
                        >
                            {textBtnConfirm || t('buttons.confirm')}
                        </CustomButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ModalActions;

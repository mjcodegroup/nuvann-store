import CustomButton from '@/components/custom-button';
import Styles from './empty-checkout.module.scss';
import { useNavigation } from '@/hooks/useNavigation';
import { RoutesUrls } from '@/utils/enums/routesUrl';
import { useTranslation } from 'react-i18next';
import { FcProcess } from 'react-icons/fc';

export default function EmptyCheckout() {
    const { redirect } = useNavigation();
    const { t } = useTranslation('checkout');
    return (
        <div className={Styles.checkout_empty}>
        <FcProcess />
        <p>{t('empty_checkout_message')}</p>
        <CustomButton
            variant="outlined"
            onClick={() => redirect(RoutesUrls.HOME)}
            backgroundColor="#000052"
            textColor="#ffff"
            width={200}
            height={35}
        >
            {t('buy_btn')}
        </CustomButton>
        </div>
    );
}
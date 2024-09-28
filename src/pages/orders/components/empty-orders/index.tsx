import CustomButton from '@/components/custom-button';
import Styles from './empty-cart.module.scss';
import { GiShoppingCart } from "react-icons/gi";
import { useNavigation } from '@/hooks/useNavigation';
import { RoutesUrls } from '@/utils/enums/routesUrl';

export default function EmptyOrders() {
    const { redirect } = useNavigation();
    return (
        <div className={Styles.cart_empty}>
            <GiShoppingCart />
            <p>Ou poko Ajoute anyen nan Panye an ...</p>
            <CustomButton
                variant="outlined"
                onClick={() => redirect(RoutesUrls.HOME)}
                backgroundColor="#000052"
                textColor="#ffff"
                width={200}
                height={35}
            >
                Achte
            </CustomButton>
        </div>
    );
}
import CustomButton from '@/components/custom-button';
import Styles from './empty-cart.module.scss';
import { GiShoppingCart } from "react-icons/gi";

export default function EmptyCart() {
    return (
        <div className={Styles.cart_empty}>
        <GiShoppingCart />
        <p>Ou poko Ajoute anyen nan Panye an ...</p>
        <CustomButton
            variant="outlined"
            onClick={() => {}}
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
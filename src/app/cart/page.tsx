import type { Metadata } from "next";
import style from '@/app/cart/page.module.css';
import AppCart from "./components/app.cart";
import AppPay from "./components/app.pay";
export const metadata: Metadata = {
    title: "Shopping Cart",
    description: "View and manage your selected fashion items before checkout.",
};
const Cart = () => {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className={style["line"]} width="1240" height="1" viewBox="0 0 1240 1"
                fill="none">
                <line x1="-4.37114e-08" y1="0.500122" x2="1240" y2="0.500014" stroke="black" strokeOpacity="0.1">
                </line>
            </svg>
            <div className={style["breadcrumb"]}>
                <div className={style["left"]}>
                    <div className={style["text"]}>
                        <a href="/">Home</a>
                    </div>
                    <div className={style["icon-greater"]}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                            <path
                                d="M1.53073 0.469372L6.53073 5.46937C6.60065 5.53905 6.65613 5.62184 6.69399 5.71301C6.73184 5.80417 6.75133 5.90191 6.75133 6.00062C6.75133 6.09933 6.73184 6.19707 6.69399 6.28824C6.65613 6.3794 6.60065 6.46219 6.53073 6.53187L1.53073 11.5319C1.38984 11.6728 1.19874 11.7519 0.999484 11.7519C0.800227 11.7519 0.609131 11.6728 0.468235 11.5319C0.327338 11.391 0.248184 11.1999 0.248184 11.0006C0.248184 10.8014 0.327338 10.6103 0.468235 10.4694L4.93761 6L0.46761 1.53062C0.326714 1.38973 0.247559 1.19863 0.247559 0.999372C0.247559 0.800115 0.326714 0.609018 0.46761 0.468122C0.608506 0.327227 0.799603 0.24807 0.99886 0.24807C1.19812 0.24807 1.38921 0.327227 1.53011 0.468122L1.53073 0.469372Z"
                                fill="black" fillOpacity="0.6" />
                        </svg>
                    </div>
                </div>
                <div className={style["right"]}>
                    <a href="/cart">Cart</a>
                </div>
            </div>
            <div className={style["title"]}>Your cart</div>
            <div className={style["cart"]}>
                <AppCart />
                <AppPay />
            </div>
        </div>
    );
}
export default Cart;
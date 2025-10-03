'use client';
import style from '@/styles/app.product-top.module.css';
import RenderStars from '@/utils/renderStars';
const AppProductTop = () => {
    const products = [
        {
            id: 1,
            name: "Vertical Striped Shirt",
            priceNew: 212,
            priceOld: 232,
            discount: "-20%",
            image: "/img/image-7-1.png",
            rating: 5,
        },
        {
            id: 2,
            name: "Courage Graphic T-shirt",
            priceNew: 145,
            image: "/img/image-8-1.png",
            rating: 4,
            priceOld: null,
            discount: null,
        },
        {
            id: 3,
            name: "Loose Fit Bermuda Shorts",
            priceNew: 80,
            image: "/img/image-9-1.png",
            rating: 3,
            priceOld: null,
            discount: null,
        },
        {
            id: 4,
            name: "Sleeve Stripped T-shirt",
            priceNew: 210,
            image: "/img/image-10-1.png",
            rating: 4.5,
            priceOld: null,
            discount: null,
        },
    ];
    return (
        <>
            <div className={style["product-top-selling"]}>
                <div className={style["product-title"]}>
                    <span>TOP SELLING</span>
                </div>
                <div className={style["product"]}>
                    {products.map((p) => (
                        <div key={p.id} className={style["product-card"]}>
                            <div className={style["img-product"]}>
                                <a href={"#"}>
                                    <img src={p.image} alt="" />
                                </a>
                            </div>
                            <div className={style["name-product"]}>
                                <a href={"#"}>{p.name}</a>
                            </div>
                            <div className={style["review-product"]}>
                                {RenderStars(p.rating)}
                                <div className={style["number-star"]}>
                                    <span className="">{p.rating}/</span><span className={style["total-star"]}>5</span>
                                </div>
                            </div>
                            <div className={style["price-product"]}>
                                <div className={style["price-new"]}><span>${p.priceNew}</span></div>
                                {p.priceOld && <div className={style["price-old"]}><span>${p.priceOld}</span></div>}
                                {p.discount && <div className={style["discount"]}><span>{p.discount}</span></div>}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style["view-all"]}>
                    <a href={"#"}>View All</a>
                </div>
            </div>
        </>
    );
}
export default AppProductTop;
'use client';
import style from '@/styles/app.product-new.module.css';
import { Product } from '@/types/products';
import RenderStars from '@/utils/renderStars';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AppProductNew = () => {
    // 
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/client/product');
                if (!response.ok) {
                    toast.error('Failed to fetch.');
                }
                const data = await response.json();
                setProducts(data);
            }
            catch (err) {
                toast.error(`Error loading products: ${(err)}`);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);
    if (loading) {
        return <div className={style["loading"]}>Loading products...</div>;
    }

    if (products.length === 0) {
        return <div className={style["no-data"]}>No new products yet.</div>;
    }
    return (
        <>
            <div className={style["product-new-arrivals"]}>
                <div className={style["product-title"]}>
                    <span>NEW ARRIVALS</span>
                </div>
                <div className={style["product"]}>
                    {products.slice(0, 4).map((p) => (
                        <div key={p.id} className={style["product-card"]}>
                            <div className={style["img-product"]}>
                                <Link href={"#"}>
                                    {p.image ? (
                                        <img src={p.image} alt={p.name} />
                                    ) : ''}
                                </Link>
                            </div>
                            <div className={style["name-product"]}>
                                <Link href={"#"}>{p.name}</Link>
                            </div>
                            <div className={style["review-product"]}>
                                {RenderStars(4.5)}
                                <div className={style["number-star"]}>
                                    <span className="">4.5/</span><span className={style["total-star"]}>5</span>
                                </div>
                            </div>
                            <div className={style["price-product"]}>
                                {p.discount && p.discount > 0 ? (
                                    <>
                                        <div className={style["price-new"]}><span>${(p.price * (1 - p.discount / 100)).toFixed(2)}</span></div>
                                        <div className={style["price-old"]}><span>${p.price}</span></div>
                                        <div className={style["discount"]}><span>-{p.discount}%</span></div>
                                    </>
                                ) : (
                                    <div className={style["price-new"]}><span>${p.price}</span></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style["view-all"]}>
                    <Link href={"#"}>View All</Link>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className={style["line-1"]} width="1240" height="1" viewBox="0 0 1240 1"
                fill="none">
                <line x1="-4.37114e-08" y1="0.500122" x2="1240" y2="0.500014" stroke="black" strokeOpacity="0.1" />
            </svg>
            <ToastContainer />
        </>
    );
}
export default AppProductNew;
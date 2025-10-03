'use client';
import style from '@/styles/app.banner.module.css';
import { useEffect, useRef, useState } from 'react';
const banners = [
    {
        title: "FIND CLOTHES THAT MATCHES YOUR STYLE",
        content:
            "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
        image: "/img/rectangle-2.png",
    },
    {
        title: "EXPLORE THE LATEST TRENDS",
        content:
            "Stay ahead of fashion with our new arrivals, carefully selected for every occasion.",
        image: "/img/rectangle-2.png",
    },
    {
        title: "QUALITY AND COMFORT GUARANTEED",
        content:
            "Discover premium fabrics and timeless designs made for your lifestyle.",
        image: "/img/rectangle-2.png",
    }
];
const AppBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const listRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);
    const slides = [
        banners[banners.length - 1],
        ...banners,
        banners[0]
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, [currentIndex]);
    const prevSlide = () => {
        if (isAnimating.current) {
            return;
        }
        isAnimating.current = true;
        setCurrentIndex((prev) => prev - 1);
        setIsTransitioning(true);
    };

    const nextSlide = () => {
        if (isAnimating.current) {
            return;
        }
        isAnimating.current = true;
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(true);
    };
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (currentIndex === 0) {
            timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(banners.length);
            }, 500);
        }
        else if (currentIndex === slides.length - 1) {
            timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(1);
            }, 500);
        }
        else {
            setIsTransitioning(true);
        }
        const unlock = setTimeout(() => {
            isAnimating.current = false;
        }, 500);
        return () => {
            clearTimeout(timeout);
            clearTimeout(unlock);
        }
    }, [currentIndex]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index + 1);
        setIsTransitioning(true);
    };
    return (
        <>
            <div className={style["slide-show"]}>
                <div ref={listRef} className={style["list-banner"]} style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: isTransitioning ? "transform 0.5s ease" : "none", display: "flex" }}>
                    {slides.map((banner, index) => (
                        <div className={style["banner"]} key={index}>
                            <div className={style["left"]}>
                                <div className={style["title"]}>
                                    <h1>{banner.title}</h1>
                                </div>
                                <div className={style["content"]}>
                                    <p>{banner.content}</p>
                                </div>
                                <div className={style["btn-shop-now"]}>
                                    <a href={"#"}>Shop Now</a>
                                </div>
                                <div className={style["statistics"]}>
                                    <div className={style["stat-items"]}>
                                        <div className={style["stat-value"]}>200+</div>
                                        <div className={style["stat-label"]}>International Brands</div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={style["line"]} width="1" height="74"
                                        viewBox="0 0 1 74" fill="none">
                                        <line x1="0.5" y1="-2.18557e-08" x2="0.500003" y2="74" stroke="black"
                                            strokeOpacity="0.1" />
                                    </svg>
                                    <div className={style["stat-items"]}>
                                        <div className={style["stat-value"]}>2,000+</div>
                                        <div className={style["stat-label"]}>High-Quality Products</div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={style["line"]} width="1" height="74"
                                        viewBox="0 0 1 74" fill="none">
                                        <line x1="0.5" y1="-2.18557e-08" x2="0.500003" y2="74" stroke="black"
                                            strokeOpacity="0.1" />
                                    </svg>
                                    <div className={style["stat-items"]}>
                                        <div className={style["stat-value"]}>30,000+</div>
                                        <div className={style["stat-label"]}>Happy Customers</div>
                                    </div>
                                </div>
                            </div>
                            <div className={style["right"]}>
                                <div className={style["img-banner"]}>
                                    <img src={banner.image} alt="" />
                                </div>
                                <div className={style["icon-star-banner"]}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={style["star-big"]} width="104" height="104"
                                        viewBox="0 0 104 104" fill="none">
                                        <path
                                            d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z"
                                            fill="black" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={style["star-small"]} width="56" height="56"
                                        viewBox="0 0 56 56" fill="none">
                                        <path
                                            d="M28 0C28.9506 15.0527 40.9472 27.0495 56 28C40.9472 28.9506 28.9506 40.9472 28 56C27.0495 40.9472 15.0527 28.9506 0 28C15.0527 27.0495 27.0495 15.0527 28 0Z"
                                            fill="black" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style["btns"]}>
                    <div className={`${style["btn-left"]} ${style["btn"]}`} onClick={prevSlide}>
                        <i className="bx  bx-chevron-left"></i>
                    </div>
                    <div className={`${style["btn-right"]} ${style["btn"]}`} onClick={nextSlide}>
                        <i className="bx  bx-chevron-right"></i>
                    </div>
                </div>
                <div className={style["index-banner"]}>
                    {banners.map((_, index) => (
                        <div key={index} className={`${style["index-item"]} ${index === (currentIndex - 1 + banners.length) % banners.length ? style["active"] : ""}`} onClick={() => goToSlide(index)}></div>
                    ))}
                </div>
            </div >
        </>
    );
}
export default AppBanner;
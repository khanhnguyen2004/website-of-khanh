'use client';
import style from '@/styles/app.category.module.css';
import Link from 'next/link';
const AppCategory = () => {
    return (
        <>
            <div className={style["browse-by-dress-style"]}>
                <div className={style["browse-content"]}>
                    <div className={style["title"]}>BROWSE BY DRESS STYLE</div>
                    <div className={style["content"]}>
                        <div className={style["row"]}>
                            <div className={`${style.category} ${style.small}`}>
                                <Link href={"#"}>
                                    <span>Casual</span>
                                    <img src="/img/image-11.png" style={{ top: "2px" }} alt="" />
                                </Link>
                            </div>
                            <div className={`${style.category} ${style.large}`}>
                                <Link href={"#"}>
                                    <span>Formal</span>
                                    <img src="/img/image-13.png" style={{ top: "2px" }} alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className={style["row"]}>
                            <div className={`${style.category} ${style.large}`}>
                                <Link href={"#"}>
                                    <span>Party</span>
                                    <img src="/img/image-12.png" alt="" />
                                </Link>
                            </div>
                            <div className={`${style.category} ${style.small}`}>
                                <Link href={"#"}>
                                    <span>Gym</span>
                                    <img src="/img/image-14.png" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AppCategory;
'use client';
import style from '@/app/admin/styles/app.header.admin.module.css';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
export const AppHeaderAdmin = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const toggleNav = () => {
        setIsOpen(!isOpen);
    };
    if (!session?.user || session.user.role !== "admin") {
        return null;
    }
    return (
        <div className={style["header-admin"]}>
            <button className={`${style.hamburger}`} onClick={toggleNav}>☰</button>
            <div className={`${style.overlay} ${isOpen ? style.open : ''}`} onClick={toggleNav}></div>
            <nav className={`${style["nav"]} ${isOpen ? style.open : style.hidden}`}>
                <div className={style["header-left"]}>
                    <div className={style["left-top"]}>
                        <ul>
                            <li>
                                <Link href="/admin/">
                                    <div className={style["menu"]}>
                                        <div className={style["menu-left"]}>
                                            <div className={style["icon"]}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    fill="#000000" viewBox="0 0 24 24" >
                                                    <path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.4 0 .77-.24.92-.62.15-.37.07-.8-.22-1.09l-8.99-9a.996.996 0 0 0-1.41 0l-9.01 9c-.29.29-.37.72-.22 1.09s.52.62.92.62Zm9-8.59 6 6V20H6v-9.59z"></path>
                                                </svg>
                                            </div>
                                            <div className={style["title"]}>Home</div>
                                        </div>
                                        <div className={style["dropdown"]}></div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/product">
                                    <div className={style["menu"]}>
                                        <div className={style["menu-left"]}>
                                            <div className={style["icon"]}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    fill="#000000" viewBox="0 0 24 24" >
                                                    <path d="m18.03,9.98l.95-4.29c.26-1.19-.18-2.37-1.16-3.09-.98-.72-2.24-.79-3.29-.19l-2.53,1.45-2.53-1.45c-1.05-.6-2.32-.53-3.29.19s-1.42,1.9-1.16,3.09l.95,4.29-2.94,10.76c-.08.3-.02.62.17.87.19.25.48.39.79.39h16c.31,0,.61-.15.79-.39.19-.25.25-.57.17-.87l-2.94-10.76ZM7.36,4.2c.13-.09.58-.37,1.12-.06l3.03,1.73c.31.18.68.18.99,0l3.03-1.73c.54-.31.99-.03,1.12.07.13.09.53.44.39,1.05l-.83,3.75H7.8l-.83-3.75c-.13-.6.27-.96.39-1.05Zm7.64,15.8v-6h-2v6h-2v-6h-2v6h-3.69l2.45-9h8.47l2.45,9h-3.69Z"></path>
                                                </svg>
                                            </div>
                                            <div className={style["title"]}>Products</div>
                                        </div>
                                        <div className={style["dropdown"]}></div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <div className={style["menu"]}>
                                    <div className={style["menu-left"]}>
                                        <div className={style["icon"]}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                fill="#000000" viewBox="0 0 24 24" >
                                                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"></path>
                                            </svg>
                                        </div>
                                        <div className={style["title"]}>Account</div>
                                    </div>
                                    <div className={style["dropdown"]}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            fill="#000000" viewBox="0 0 24 24" >
                                            <path d="M17.35 8H6.65c-.64 0-.99.76-.56 1.24l5.35 6.11c.3.34.83.34 1.13 0l5.35-6.11C18.34 8.76 18 8 17.36 8Z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <ul className={style["sub-menu"]}>
                                    <li><Link href="/admin/account/customer">Customers</Link></li>
                                    <li><Link href="/admin/account/employee">Employee</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className={style["left-bottom"]}>
                        <ul>
                            <li>
                                <Link href="/admin/profile">
                                    <div className={style["menu"]}>
                                        <div className={style["menu-left"]}>
                                            <div className={style["icon"]}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                                    fill="#000000" viewBox="0 0 24 24" >
                                                    <path d="M12 6c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4m0 6c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2"></path><path d="M12 2C6.49 2 2 6.49 2 12c0 3.26 1.58 6.16 4 7.98V20h.03c1.67 1.25 3.73 2 5.97 2s4.31-.75 5.97-2H18v-.02c2.42-1.83 4-4.72 4-7.98 0-5.51-4.49-10-10-10M8.18 19.02C8.59 17.85 9.69 17 11 17h2c1.31 0 2.42.85 2.82 2.02-1.14.62-2.44.98-3.82.98s-2.69-.35-3.82-.98m9.3-1.21c-.81-1.66-2.51-2.82-4.48-2.82h-2c-1.97 0-3.66 1.16-4.48 2.82A7.96 7.96 0 0 1 4 11.99c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.29-.97 4.36-2.52 5.82"></path>
                                                </svg>
                                            </div>
                                            <div className={style["title"]}>{session?.user.firstName && session.user.lastName ? `${session.user.firstName} ${session.user.lastName}` : ""}</div>
                                        </div>
                                        <div className={style["dropdown"]}></div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="" onClick={(e) => { e.preventDefault(); signOut({ callbackUrl: '/login' }); }}>
                                    <div className={style["menu"]}>
                                        <div className={style["menu-left"]}>
                                            <div className={style["icon"]}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    fill="#000000" viewBox="0 0 24 24" >
                                                    <path d="M15 11H8v2h7v4l6-5-6-5z"></path><path d="M5 21h7v-2H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2"></path>
                                                </svg>
                                            </div>
                                            <div className={style["title"]}>Logout</div>
                                        </div>
                                        <div className={style["dropdown"]}></div>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div >
    );

}
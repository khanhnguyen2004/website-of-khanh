'use client';
import { useSession } from "next-auth/react";
import style from '@/app/admin/profile/page.module.css';
import { useEffect, useState } from "react";
import React from 'react';
const Profile = () => {
    const { data: session, status } = useSession();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });
    useEffect(() => {
        if (status === "authenticated" && session?.user.role === 'admin') {
            setFormData({
                firstName: session.user.firstName || "",
                lastName: session.user.lastName || "",
                email: session.user.email || "",
                phoneNumber: session.user.phoneNumber || ""
            })
        }
    }, [session, status]);
    if (status === "loading") {
        return <div className={style["container"]}>Loading...</div>;
    }
    if (!session?.user || session.user.role !== 'admin') {
        return null;
    }
    return (
        <>
            <div className={style["container"]} style={{ width: "100%" }}>
                <div className={style["profile"]}>
                    <div className={style["form-profile"]}>
                        <div className={style["title"]}>Your information</div>
                        <form>
                            <div className={style["input-group"]}>
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" value={session.user.username} placeholder="Choose a username" readOnly disabled />
                            </div>
                            <div className={style["input-group"]}>
                                <label htmlFor="first-name">First name</label>
                                <input type="text" id="firstName" name="firstName" value={formData.firstName} placeholder="Enter your first-name" readOnly disabled />
                            </div>
                            <div className={style["input-group"]}>
                                <label htmlFor="last-name">Last name</label>
                                <input type="text" id="lastName" name="lastName" value={formData.lastName} placeholder="Enter your last-name" readOnly disabled />
                            </div>
                            <div className={style["input-group"]}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} placeholder="Enter your email" readOnly disabled />
                            </div>
                            <div className={style["input-group"]}>
                                <label htmlFor="phone-number">Phone number</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} placeholder="Enter your phone-number" readOnly disabled />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
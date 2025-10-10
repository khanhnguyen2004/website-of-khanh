'use client';
import { useSession } from "next-auth/react";
import style from '@/app/profile/page.module.css';
import { useEffect, useState } from "react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
const Profile = () => {
    const { data: session, status } = useSession();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });
    useEffect(() => {
        if (status === "authenticated" && session?.user.role === 'client') {
            setFormData({
                firstName: session.user.firstName || "",
                lastName: session.user.lastName || "",
                email: session.user.email || "",
                phoneNumber: session.user.phoneNumber || ""
            })
        }
    }, [session, status]);
    useEffect(() => {
        if (status === "unauthenticated") {
            window.location.href = "/login";
        }
    }, [status]);
    if (status === "loading") {
        return <div className={style["container"]}>Loading...</div>;
    }
    if (!session?.user || session.user.role !== 'client') {
        return null;
    }
    const resetForm = () => {
        if (session?.user) {
            setFormData({
                firstName: session.user.firstName || "",
                lastName: session.user.lastName || "",
                email: session.user.email || "",
                phoneNumber: session.user.phoneNumber || ""
            });
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    const validationForm = () => {
        const nameRegex = /^[A-Za-zÀ-ỹ\s]{1,30}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^0\d{9}$/;
        if (!nameRegex.test(formData.firstName)) {
            toast.error("First name must contain only letters.");
            return false;
        }
        if (!nameRegex.test(formData.lastName)) {
            toast.error("Last name must contain only letters.");
            return false;
        }
        if (!emailRegex.test(formData.email)) {
            toast.error("Invalid email address.");
            return false;
        }
        if (!phoneRegex.test(formData.phoneNumber)) {
            toast.error("Invalid phone number. Must start with 0 and have 10 digits.");
            return false;
        }
        return true;
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validationForm()) {
            resetForm();
            return;
        }
        const response = await fetch('/api/user/profile/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: session.user.username, ...formData })
        });
        const result = await response.json();
        if (!response.ok) {
            toast.error(result.message);
            resetForm();
        }
        else {
            toast.success("Information updated successfully.");
        }
    };
    return (
        <>
            <div className={style["container"]} style={{ width: "100%", padding: "0 100px" }}>
                <div className={style["profile"]}>
                    <div className={style["img-back"]}>
                        <Link href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                                <path d="M7.70406 0.454104L0.954061 7.2041C0.849182 7.30862 0.765966 7.43281 0.709186 7.56956C0.652405 7.7063 0.623175 7.85291 0.623175 8.00098C0.623175 8.14904 0.652405 8.29565 0.709186 8.4324C0.765966 8.56915 0.849182 8.69334 0.954061 8.79785L7.70406 15.5479C7.91541 15.7592 8.20205 15.8779 8.50094 15.8779C8.79982 15.8779 9.08647 15.7592 9.29781 15.5479C9.50916 15.3365 9.62789 15.0499 9.62789 14.751C9.62789 14.4521 9.50916 14.1654 9.29781 13.9541L4.46875 9.12504L18.25 9.12504C18.5484 9.12504 18.8345 9.00651 19.0455 8.79554C19.2565 8.58456 19.375 8.29841 19.375 8.00004C19.375 7.70167 19.2565 7.41552 19.0455 7.20455C18.8345 6.99357 18.5484 6.87504 18.25 6.87504L4.46875 6.87504L9.29875 2.04598C9.51009 1.83463 9.62883 1.54799 9.62883 1.2491C9.62883 0.950218 9.51009 0.663574 9.29875 0.45223C9.08741 0.240885 8.80076 0.122151 8.50187 0.122151C8.20299 0.122151 7.91634 0.240885 7.705 0.45223L7.70406 0.454104Z" fill="black" />
                            </svg>
                        </Link>
                    </div>
                    <div className={style["img-logo"]}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="159" height="25" viewBox="0 0 159 25" fill="none">
                            <path d="M11.6 24.7467C3.86667 24.72 0.213333 22.32 0.4 16.5067H7.04C7.12 18.0267 8.4 18.96 11.6 18.9867C14.4267 19.0133 15.7333 18.2133 15.7333 17.1733C15.7333 16.4533 15.3333 15.7067 13.1467 15.3867L10.2667 14.9333C6.02667 14.24 0.933333 13.7333 0.933333 8C0.933333 3.57333 4.53333 0.853333 11.6533 0.853333C18.08 0.853333 22.56 2.64 22.4267 9.04H15.84C15.5733 7.54667 14.32 6.61333 11.4933 6.61333C9.04 6.61333 8.02667 7.36 8.02667 8.37333C8.02667 9.01333 8.42667 9.78667 10.1333 10.0533L12.5067 10.4533C16.96 11.2 23.0667 11.3333 23.0667 17.4667C23.0667 22.3467 19.28 24.7733 11.6 24.7467ZM40.5446 1.6H47.9313V24H40.5446V15.8933H31.8513V24H24.4646V1.6H31.8513V9.70667H40.5446V1.6ZM62.1017 24.7467C54.395 24.7467 49.4083 19.9733 49.4083 12.8C49.4083 5.62667 54.395 0.853333 62.1017 0.853333C69.8083 0.853333 74.795 5.62667 74.795 12.8C74.795 19.9733 69.8083 24.7467 62.1017 24.7467ZM62.1017 18.3733C65.035 18.3733 67.4617 16.3467 67.4617 12.8C67.4617 9.25333 65.035 7.22667 62.1017 7.22667C59.1683 7.22667 56.7417 9.25333 56.7417 12.8C56.7417 16.3467 59.1683 18.3733 62.1017 18.3733ZM76.2771 24V1.6H88.9971C95.1038 1.6 98.7304 4.32 98.7304 10.3467C98.7304 16.3733 95.1038 19.0933 89.0238 19.0933H83.6638V24H76.2771ZM83.6638 12.96H88.3571C90.1438 12.96 91.2904 12.08 91.2904 10.3467C91.2904 8.61333 90.1438 7.73333 88.3837 7.73333H83.6638V12.96ZM102.426 24.4267C100.426 24.4267 98.7458 22.7733 98.7458 20.8C98.7458 18.8267 100.426 17.1733 102.426 17.1733C104.426 17.1733 106.106 18.8267 106.106 20.8C106.106 22.7733 104.426 24.4267 102.426 24.4267ZM120.151 24.7467C112.605 24.7467 107.565 19.9733 107.565 12.8C107.565 5.62667 112.605 0.853333 120.151 0.853333C125.618 0.853333 131.218 3.25333 131.965 10.8267H124.925C124.311 8.37333 122.578 7.22667 120.151 7.22667C117.218 7.22667 114.898 9.41333 114.898 12.8C114.898 16.1867 117.218 18.3733 120.151 18.3733C122.578 18.3733 124.311 17.2267 124.925 14.72H131.965C131.218 22.3467 125.671 24.7467 120.151 24.7467ZM146.008 24.7467C138.301 24.7467 133.315 19.9733 133.315 12.8C133.315 5.62667 138.301 0.853333 146.008 0.853333C153.715 0.853333 158.701 5.62667 158.701 12.8C158.701 19.9733 153.715 24.7467 146.008 24.7467ZM146.008 18.3733C148.941 18.3733 151.368 16.3467 151.368 12.8C151.368 9.25333 148.941 7.22667 146.008 7.22667C143.075 7.22667 140.648 9.25333 140.648 12.8C140.648 16.3467 143.075 18.3733 146.008 18.3733Z" fill="black" />
                        </svg>
                    </div>
                    <div className={style["form-profile"]}>
                        <div className={style["title"]}>Welcome! Update your information</div>
                        <form onSubmit={handleSubmit}>
                            <div className={style["input-group"]}>
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" value={session.user.username} placeholder="Choose Link username" readOnly disabled />
                            </div>
                            <div className={style["input-group"]}>
                                <label htmlFor="first-name">First name</label>
                                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first-name" required />
                            </div>
                            <div className={style["input-group"]}>
                                <label htmlFor="last-name">Last name</label>
                                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last-name" required />
                            </div>
                            <div className={style["input-group"]}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                            </div>
                            <div className={style["input-group"]}>
                                <label htmlFor="phone-number">Phone number</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phone-number" required />
                            </div>
                            <button type="submit" className={style["btn-profile"]}>Update information</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Profile;
'use client';
import style from '@/app/admin/account/page.module.css';
import { Customer } from '@/types/users';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AccountCustomers() {
    const { data: session, status } = useSession();
    const [customers, setCustomers] = useState<Customer[]>([]);
    useEffect(() => {
        if (status === "authenticated" && session.user.role === "admin") {
            fetchCustomers();
        }
        else if (status === "unauthenticated") {
            window.location.href = "/login";
        }
    }, [status, session]);
    const fetchCustomers = async () => {
        const response = await fetch('/api/user/customer');
        if (!response.ok) {
            toast.error("Failed to load customer data.");
        }
        const data = await response.json();
        setCustomers(data);
    };
    if (status === "loading") {
        return (
            <div className={style["page-container"]}>
                <div className={style["loading"]}>Loading...</div>
            </div>
        );
    }
    return (
        <div className={style["page-container"]}>
            <h1 className={style["title"]}>👤 Customer Management</h1>
            <p className={style["desc"]}>List of all customers who have registered an account.</p>
            <table className={style["table"]}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers.map((customers) => (
                            <tr key={customers.id}>
                                <td>{customers.id}</td>
                                <td>{customers.username}</td>
                                <td>{customers.firstName}</td>
                                <td>{customers.lastName}</td>
                                <td>{customers.email}</td>
                                <td>{customers.phoneNumber}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className={style["no-data"]}>
                                No customers found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
}
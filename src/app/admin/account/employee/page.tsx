'use client';
import style from '@/app/admin/account/page.module.css';
import { Employee } from '@/types/users';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AccountEmployees() {
    const { data: session, status } = useSession();
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {
        if (status === "authenticated" && session.user.role === "admin") {
            fetchEmployees();
        }
        else if (status === "unauthenticated") {
            window.location.href = "/login";
        }
    }, [status, session]);
    const fetchEmployees = async () => {
        const response = await fetch('/api/user/employee');
        if (!response.ok) {
            toast.error("Failed to load employee data.");
        }
        const data = await response.json();
        setEmployees(data);
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
            <h1 className={style["title"]}>👨‍💼 Employee Management</h1>
            <p className={style["desc"]}>List of system employees and their assigned roles.</p>
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
                    {employees.length > 0 ? (
                        employees.map((employees) => (
                            <tr key={employees.id}>
                                <td>{employees.id}</td>
                                <td>{employees.username}</td>
                                <td>{employees.firstName}</td>
                                <td>{employees.lastName}</td>
                                <td>{employees.email}</td>
                                <td>{employees.phoneNumber}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className={style["no-data"]}>
                                No employees found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
}
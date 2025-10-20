export interface Users {
    id: number,
    username: string,
    password: string,
    role: string
}
export interface InfoUsers {
    username: string;
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    idUser: number;
}
export interface InfoAdmin {
    username: string;
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    idUser: number;
}
export interface Employee {
    id: number;
    username: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
}
export interface Customer {
    id: number;
    username: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
}
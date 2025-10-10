import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: number,
        username: string,
        lastName?: string,
        firstName?: string,
        email?: string,
        phoneNumber?: string,
        role?: string
    }
    interface Session {
        user: {
            id: number;
            username: string;
            firstName?: string;
            lastName?: string;
            email?: string;
            phoneNumber?: string;
            role?: string;
        } & DefaultSession["user"];
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        id: number;
        username: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        phoneNumber?: string;
        role?: string;
    }
}
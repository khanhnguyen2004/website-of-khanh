import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByUsername } from "@/app/api/user/login/route";
export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                const user = await getUserByUsername(String(credentials?.username), String(credentials?.password))

                if (!user) {
                    throw new Error("Invalid credentials.")
                }
                return {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.email = user.email;
                token.phoneNumber = user.phoneNumber;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                // session.user.id = token.id;
                session.user.username = token.username as string;
                session.user.firstName = token.firstName as string;
                session.user.lastName = token.lastName as string;
                session.user.email = token.email as string;
                session.user.phoneNumber = token.phoneNumber as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    }
});
export const { GET, POST } = handlers
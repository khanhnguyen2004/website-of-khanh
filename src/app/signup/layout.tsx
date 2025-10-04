import type { Metadata } from "next";
import '@/app/globals.css'
export const metadata: Metadata = {
    title: "SignUp",
    description: "Sign up to your account or create a new one.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}

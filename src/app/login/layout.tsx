import type { Metadata } from "next";
import '@/app/globals.css'
export const metadata: Metadata = {
    title: "LogIn",
    description: "Sign in to your Shop.co account to access your orders, wishlist, and personalized recommendations.",
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

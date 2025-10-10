import type { Metadata } from "next";
import '@/app/globals.css'
import '@/app/favicon.ico';
import "boxicons/css/boxicons.min.css";
import AppFooter from "@/components/app.footer";
import AppHeader from "@/components/app.header";
export const metadata: Metadata = {
    title: "Shopping Cart",
    description: "View and manage your selected fashion items before checkout.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container">
            <header>
                <AppHeader />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <AppFooter />
            </footer>
        </div>
    );
}

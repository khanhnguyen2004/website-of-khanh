import type { Metadata } from "next";
import "boxicons/css/boxicons.min.css";
import "@/app/admin/global.css";
import { AppHeaderAdmin } from "./components/app.header.admin";

export const metadata: Metadata = {
    title: "Admin Page",
    description: "Admin Page for managing the e-commerce platform.",
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container">
            <header>
                <AppHeaderAdmin />
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}

import type { Metadata } from "next";
import '@/app/globals.css'
import AppHeader from "@/components/app.header";
import AppFooter from "@/components/app.footer";
export const metadata: Metadata = {
    title: "Profile",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
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
            </body>
        </html>
    );
}

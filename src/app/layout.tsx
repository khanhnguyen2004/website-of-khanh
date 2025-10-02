import type { Metadata } from "next";
import './globals.css'
import "boxicons/css/boxicons.min.css";
import AppHeader from "@/components/app.header";
import AppFooter from "@/components/app.footer";
export const metadata: Metadata = {
  title: "Home Page",
  description: "Fashion e-commerce homepage",
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

import type { Metadata } from "next";
import './globals.css'
import '@/app/favicon.ico';
import "boxicons/css/boxicons.min.css";
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
        {children}
      </body>
    </html>
  );
}

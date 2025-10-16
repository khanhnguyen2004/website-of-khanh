import { NextRequest, NextResponse } from "next/server";
import { auth } from "./src/app/api/auth/[...nextauth]/route";
export async function middleware(req: NextRequest) {
    const session = await auth();
    const pathname = req.nextUrl.pathname;
    if (!session && pathname != "/login") {
        const newUrl = new URL("/login", req.nextUrl.origin);
        return NextResponse.redirect(newUrl);
    }
    if (session?.user?.role) {
        const role = session.user.role;
        if (role === "admin") {
            if (pathname !== "/admin" && pathname.startsWith("/admin/") && pathname !== "/login") {
                return NextResponse.redirect(new URL("/admin", req.url));
            }
        }
        else if (role === "client") {
            if (pathname.startsWith("/admin")) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }
    }
    if (pathname === "/" || pathname === "/profile" || pathname === "/signup" || pathname === "/cart" || pathname === "/login") {
        return NextResponse.next();
    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/", "/login", "/signup", "/profile", "/cart", "/admin/:path*"],
};
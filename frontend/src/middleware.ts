import { NextRequest, NextResponse } from "next/server";
import { publicPages } from "./models/public-pages";

export async function middleware(request: NextRequest) {
    const { nextUrl, url, cookies } = request;

    const user = cookies.get("user");
    const isProtected = !publicPages.includes(nextUrl.pathname);
    if (!isProtected && user) {
        return NextResponse.redirect(new URL("/", url));
    }

    if (isProtected && !user) {
        return NextResponse.redirect(new URL("/login", url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
};

import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { LevelOne, LevelThere } from "./constants/AuthRoles";

LevelOne
export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request) {
        // console.log("token: ", request.nextauth.token);

        if (request.nextUrl.pathname.startsWith("/admin") && !LevelThere.includes(request.nextauth.token?.role))
            return NextResponse.redirect(
                new URL(`/auth/login?message=You Are Not Authorized!&callbackUrl=${encodeURIComponent(request.nextUrl.href)}`, request.url)
            );
        if (request.nextUrl.pathname.startsWith("/user") && !LevelOne.includes(request.nextauth.token?.role))
            return NextResponse.redirect(
                new URL("/auth/login?message=You Are Not Authorized!", request.url)
            );
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/user/:path*"],
};
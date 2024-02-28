import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { LevelThere } from "./constants/AuthRoles";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request) {
        // console.log("token: ", request.nextauth.token);

        if(request.nextUrl.pathname === "/") {
            return NextResponse.redirect(
                new URL(`/titles/mbdb?from=home_path_redirect`, request?.url)
            );
        };

        const token = request.nextauth.token;

        // if no token then re-direct to login
        if(!token || !token?.loginDate || !token?.accessToken) {
            return NextResponse.redirect(
                new URL(`/login?message=Un Authenticated User!&callbackUrl=${encodeURIComponent(request.nextUrl.href)}`, request?.url)
            );
        };

        // if 8 hours completed from time of login then re-login
        // if(new Date() > new Date(token?.loginDate).getTime() + 8 * 60 * 60 * 1000) {
        //     return NextResponse.redirect(
        //         new URL(`/login?message=Authentication Expired!&callbackUrl=${encodeURIComponent(request.nextUrl.href)}`, request?.url)
        //     );
        // }

        if (request.nextUrl.pathname.startsWith("/admin") && !LevelThere.includes(token?.role))
            return NextResponse.redirect(
                new URL(`/login?message=You Are Not Authorized!&callbackUrl=${encodeURIComponent(request.nextUrl.href)}`, request?.url)
            );
    },
    {
        callbacks: {
            authorized: ({ token, req }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|login|signup|password-reset|user-account-status|\/|_next/static|_next/image|favicon.ico).*)',
    ],
};
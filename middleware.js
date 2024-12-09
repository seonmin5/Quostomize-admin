import { NextResponse } from 'next/server';
import { auth } from "./auth";

export default auth((req) => {
    const session = req.auth;
    const goalURL = req.nextUrl.pathname.slice(1);

    if (!session) {  
        console.error('No session, redirecting to login');
        if (goalURL !== "login") {
            return NextResponse.redirect(
                new URL(`/login?to=${goalURL}`, req.url)
            );  
        } else {
            return NextResponse.redirect(
                new URL(`/login`, req.url)
            );  
        }
    }

    if (!session.memberRole !== "ROLE_ADMIN") {  
        console.error('Not Admin, redirecting to login');
        if (goalURL !== "login") {
            return NextResponse.redirect(
                new URL(`/login?to=${goalURL}`, req.url)
            );  
        } else {
            return NextResponse.redirect(
                new URL(`/login`, req.url)
            );  
        }
    }
    
    return NextResponse.next();
});

export const config = {  
    matcher: [
        "/cards/:path*",
        "/franchises/:path*",
        "/information/:path*",
        "/members/:path*",
        "/notifications/:path*",
        "/setting/:path*",
    ] 
};
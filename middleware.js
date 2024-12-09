import { NextResponse } from 'next/server';
import { auth } from "./auth";

export default auth((req) => {
    const session = req.auth;

    if (!session) {  
        console.error('No session, redirecting to login');
        return NextResponse.redirect(
            new URL(`/login`, req.url)
        );  
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